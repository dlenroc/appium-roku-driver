import type { Driver } from '../Driver';

export async function terminateApp(this: Driver, appId: string): Promise<boolean> {
  const activeApp = await this.roku.ecp.queryActiveApp();

  if (typeof activeApp.app !== 'string' && activeApp.app.id == appId) {
    await this.closeApp();
    return true;
  }

  return false;
}
