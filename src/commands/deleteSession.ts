import { BaseDriver, errors } from '@appium/base-driver';
import { Driver } from '../Driver.js';
import { SDK } from '../helpers/sdk.js';

export async function deleteSession(
  this: Driver,
  sessionId?: string | null
): Promise<void> {
  this.sdk.controller.abort(
    new errors.UnknownError('The session was terminated!')
  );

  try {
    const sdk = new SDK(this.sdk);
    if (this.opts.shouldTerminateApp) {
      const driver = new Driver(this.opts);
      driver.sdk = sdk;
      await driver.terminateApp('dev');
    } else if (this.pressedKey) {
      await sdk.ecp.keyup({ key: this.pressedKey });
    }
  } finally {
    return BaseDriver.prototype.deleteSession.call(this, sessionId);
  }
}
