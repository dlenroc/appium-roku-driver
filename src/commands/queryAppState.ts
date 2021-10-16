import { Driver } from '../Driver';

export async function queryAppState(this: Driver, appId: string): Promise<number> {
  const activeApp = await this.roku.ecp.queryActiveApp();

  if (typeof activeApp.app !== 'string' && activeApp.app.id == appId) {
    // running in background
    if (activeApp.screensaver) {
      return 3;
    }

    // running in foreground
    return 4;
  }

  const isInstalled = await this.isAppInstalled(appId);

  // not running/installed
  return +isInstalled;
}
