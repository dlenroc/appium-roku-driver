import * as ecp from '@dlenroc/roku-ecp';
import type { Driver } from '../Driver.ts';

export async function terminateApp(
  this: Driver,
  appId: string
): Promise<boolean> {
  const activeApp = await ecp.queryActiveApp(this.sdk.ecp);

  if ('id' in activeApp.app && activeApp.app.id == appId) {
    await this.closeApp();
    return true;
  }

  return false;
}
