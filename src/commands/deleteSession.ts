import { BaseDriver, errors } from '@appium/base-driver';
import type { Driver } from '../Driver.ts';
import * as appiumUtils from '../helpers/appium.js';
import { SDK } from '../helpers/sdk.js';

export async function deleteSession(
  this: Driver,
  sessionId?: string | null
): Promise<void> {
  try {
    this.sdk.controller.abort(
      new errors.UnknownError('The session was terminated!')
    );

    const sdk = new SDK(this.sdk);
    if (this.opts.shouldTerminateApp) {
      await sdk.ecp.keypress({ key: 'Home' });
      await appiumUtils.retrying({
        timeout: 1e4,
        validate: (state) => !!state && !!('id' in state.app),
        command: () => sdk.ecp.queryActiveApp(),
      });
    } else if (this.pressedKey) {
      await sdk.ecp.keyup({ key: this.pressedKey });
    }
  } finally {
    return BaseDriver.prototype.deleteSession.call(this, sessionId);
  }
}
