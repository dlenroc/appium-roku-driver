import * as ecp from '@dlenroc/roku-ecp';
import type { Driver } from '../Driver.ts';

export async function isAppInstalled(
  this: Driver,
  appId: string
): Promise<boolean> {
  const apps = await ecp.queryApps(this.sdk.ecp);
  return apps.some((app) => app.id == appId);
}
