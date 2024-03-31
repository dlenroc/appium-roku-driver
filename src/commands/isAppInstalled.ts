import type { Driver } from '../Driver.ts';

export async function isAppInstalled(
  this: Driver,
  appId: string
): Promise<boolean> {
  const apps = await this.sdk.ecp.queryApps();
  return apps.some((app) => app.id == appId);
}
