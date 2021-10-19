import { BaseDriver } from '@appium/base-driver';
import { Driver } from '../Driver';

export async function deleteSession(this: Driver, deleteSession: BaseDriver['deleteSession']): Promise<void> {
  await deleteSession();

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
