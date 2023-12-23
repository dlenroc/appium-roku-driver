import * as ecp from '@dlenroc/roku-ecp';
import type { Driver } from '../Driver.ts';

export async function activateApp(
  this: Driver,
  appId: string,
  options?: unknown
): Promise<void> {
  await ecp.launch(this.sdk.ecp, {
    appId: appId as ecp.AppId,
    params: options as Record<string, unknown>,
  });
  await this.waitForCondition({
    error: 'Channel not started',
    condition: async () => {
      const state = await this.queryAppState(appId);
      return state === 4;
    },
  });
}
