import { BaseDriver } from '@appium/base-driver';
import type { Driver } from '../Driver.ts';

export async function deleteSession(
  this: Driver,
  sessionId?: string
): Promise<void> {
  try {
    await BaseDriver.prototype.deleteSession.call(this, sessionId);

    const { fullReset, noReset } = this.opts;

    if (fullReset) {
      await this.removeApp('dev');
    }

    if (!noReset) {
      await this.closeApp();
    }
  } finally {
    this.abortController.abort('Session deleted');
  }
}
