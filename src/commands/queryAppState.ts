import type { AppId } from '@dlenroc/roku-ecp';
import type { Driver } from '../Driver.ts';

export async function queryAppState(
  this: Driver,
  appId: string
): Promise<0 | 1 | 2 | 3 | 4> {
  const appState = await this.sdk.ecp
    .queryAppState({ appId: appId as AppId })
    // TODO: Replace fallback with a check based on the OS version
    .catch(() => ({ status: 'FAILED' } as const));

  if (appState.status === 'OK') {
    // not running
    if (appState.state === 'inactive') {
      return 1;
    }

    // running in background or suspended
    if (appState.state === 'background') {
      return 2;
    }

    if (appState.state === 'active') {
      const activeApp = await this.sdk.ecp.queryActiveApp();

      // running in background
      if (activeApp.screensaver) {
        return 3;
      }

      // is running in foreground
      return 4;
    }
  } else {
    const activeApp = await this.sdk.ecp.queryActiveApp();

    // running in foreground
    if ('id' in activeApp.app && activeApp.app.id == appId) {
      return 4;
    }
  }

  const isInstalled = await this.isAppInstalled(appId);

  // not installed/running
  return +isInstalled as 0 | 1;
}
