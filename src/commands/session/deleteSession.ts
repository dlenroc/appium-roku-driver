import { BaseDriver } from '@appium/base-driver';
import { Driver } from '../../Driver';

export async function deleteSession(this: Driver, deleteSession: BaseDriver['deleteSession']) {
  if (!this.opts.skipUninstall) {
    const isInstalled = await this.isAppInstalled('dev');
    if (isInstalled) {
      await this.removeApp('dev');
    }
  }

  await this.closeApp();
  await deleteSession();
}
