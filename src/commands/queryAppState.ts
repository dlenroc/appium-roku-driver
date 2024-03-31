import type { Driver } from '../Driver.ts';

export async function queryAppState(
  this: Driver,
  appId: string
): Promise<0 | 1 | 2 | 3 | 4> {
  const activeApp = await this.sdk.ecp.queryActiveApp();

  if ('id' in activeApp.app && activeApp.app.id == appId) {
    // running in background
    if (activeApp.screensaver) {
      return 3;
    }

    // running in foreground
    return 4;
  }

  const isInstalled = await this.isAppInstalled(appId);

  // not running/installed
  return +isInstalled as 0 | 1;
}
