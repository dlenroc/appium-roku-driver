import { BaseDriver, errors } from '@appium/base-driver';
import type { Driver } from '../Driver.ts';

export async function deleteSession(
  this: Driver,
  sessionId?: string | null
): Promise<void> {
  await BaseDriver.prototype.deleteSession.call(this, sessionId);

  if (this.opts.shouldTerminateApp) {
    await this.performActions([
      {
        id: 'remote',
        type: 'key',
        actions: [
          { type: 'keyDown', value: 'Home' },
          { type: 'keyUp', value: 'Home' },
        ],
      },
    ]);
  }

  this.controller?.abort(
    new errors.UnknownError('The session was terminated!')
  );
}
