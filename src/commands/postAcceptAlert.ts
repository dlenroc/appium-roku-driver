import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver';
import { BUTTON, DIALOG } from '../Elements';

export async function postAcceptAlert(this: Driver): Promise<void> {
  if (!(await this.isAlertShown())) {
    throw new errors.NoAlertOpenError(undefined);
  }

  const button = this.roku.document.xpathSelect(`//*[${DIALOG}]//*[${BUTTON}]`);

  if (!button) {
    throw new errors.InvalidElementStateError('Failed to accept dialog');
  }

  await button.select();

  await this.waitForCondition({
    error: 'Dialog is still visible',
    condition: async () => {
      const isAlertShown = await this.isAlertShown();
      return !isAlertShown;
    },
  });
}
