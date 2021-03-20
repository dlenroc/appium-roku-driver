import { Driver } from '../../Driver';

export async function isAppInstalled(this: Driver, id: string): Promise<boolean> {
  const apps = await this.roku.ecp.queryApps();
  return apps.some((app) => app.id == id);
}
