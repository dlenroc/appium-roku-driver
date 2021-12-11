import type { Driver } from '../Driver';

export async function terminateApp(this: Driver, appId: string, options?: unknown): Promise<void> {
  const activeApp = await this.roku.ecp.queryActiveApp();

  if (typeof activeApp.app !== 'string' && activeApp.app.id == appId) {
    await this.closeApp();
  }
}
