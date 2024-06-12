import type { AppId } from '@dlenroc/roku-ecp';
import type { Driver } from '../Driver.ts';
import * as appiumUtils from '../helpers/appium.js';

export async function terminateApp(
  this: Driver,
  appId: string
): Promise<boolean> {
  let state = await appiumUtils.retrying({
    timeout: 1e4,
    validate: (state, error) => !error && state! <= 2,
    command: async () => {
      await this.sdk.ecp.exitApp({ appId: appId as AppId });
      return this.queryAppState(appId);
    },
  });

  await this.sdk.debugServer.clearLaunchCaches({
    signal: AbortSignal.timeout(1e4),
  });

  if (state == 2) {
    state = await appiumUtils.retrying({
      timeout: 1e4,
      validate: (state, error) => !error && state! <= 1,
      command: () => this.queryAppState(appId),
    });
  }

  return state === 1;
}
