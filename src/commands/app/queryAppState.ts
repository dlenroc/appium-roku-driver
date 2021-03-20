import { Driver } from '../../Driver';

export async function queryAppState(this: Driver, id: string): Promise<number> {
  const activeApp = await this.roku.ecp.queryActiveApp();

  // running in background
  if (activeApp.screensaver) {
    return 3;
  }

  // running in foreground
  if (activeApp.app['id'] == id) {
    return 4;
  }

  const isInstalled = await this.isAppInstalled(id);

  // not running/installed
  return +isInstalled;
}
