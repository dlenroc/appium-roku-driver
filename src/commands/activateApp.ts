import { errors } from '@appium/base-driver';
import * as ecp from '@dlenroc/roku-ecp';
import type { Driver } from '../Driver.ts';
import * as appiumUtils from '../helpers/appium.js';

export async function activateApp(
  this: Driver,
  appId: string,
  options?: unknown
): Promise<void> {
  options ??= {};

  if (typeof options !== 'object' || Array.isArray(options)) {
    throw new errors.InvalidArgumentError('Launch arguments must be an object');
  }

  await this.sdk.ecp.launch({
    appId: appId as ecp.AppId,
    params: options as Record<string, unknown>,
  });

  let screensaverDismissed = false;

  await appiumUtils.retrying({
    timeout: 1e4,
    validate: (state, error) => !error && state === 4,
    command: async () => {
      const state = await this.queryAppState(appId);
      if (!screensaverDismissed && state === 3) {
        screensaverDismissed = true;
        await this.sdk.ecp.keypress({ key: 'Enter' });
      }

      return state;
    },
  });
}
