import type { ExternalDriver } from '@appium/types';
import type { Driver } from '../Driver';

export async function deleteSession(this: Driver, deleteSession: ExternalDriver['deleteSession']): Promise<void> {
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
