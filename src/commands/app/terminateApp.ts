import { Driver } from '../../Driver';

export async function terminateApp(this: Driver, id: string): Promise<void> {
  const activeApp = await this.roku.ecp.queryActiveApp();

  if (activeApp.app['id'] == id) {
    await this.closeApp();
  }
}
