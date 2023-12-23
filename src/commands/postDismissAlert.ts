import { errors } from '@appium/base-driver';
import * as ecp from '@dlenroc/roku-ecp';
import type { Driver } from '../Driver.ts';

export async function postDismissAlert(this: Driver): Promise<void> {
  if (!(await this.isAlertShown())) {
    throw new errors.NoAlertOpenError(undefined);
  }

  await ecp.keypress(this.sdk.ecp, { key: 'Back' });

  await this.waitForCondition({
    error: 'Dialog is still visible',
    condition: async () => {
      const isAlertShown = await this.isAlertShown();
      return !isAlertShown;
    },
  });
}
