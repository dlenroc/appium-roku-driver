import { BaseDriver } from '@appium/base-driver';
import type { Driver } from '../Driver';

export async function deleteSession(this: Driver, sessionId?: string): Promise<void> {
  await BaseDriver.prototype.deleteSession.call(this, sessionId);

  const { fullReset, noReset } = this.opts;

  if (fullReset) {
    const isInstalled = await this.isAppInstalled('dev');

    if (isInstalled) {
      await this.removeApp('dev');
    }
  }

  if (!noReset) {
    await this.closeApp();
  }
}
