import * as ecp from '@dlenroc/roku-ecp';
import type { Driver } from '../Driver.ts';

export async function isLocked(this: Driver): Promise<boolean> {
  const activeApp = await ecp.queryActiveApp(this.sdk.ecp);
  return !!activeApp.screensaver;
}
