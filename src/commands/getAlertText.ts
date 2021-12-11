import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver';

export async function getAlertText(this: Driver): Promise<string | null> {
  if (!(await this.isAlertShown())) {
    throw new errors.NoAlertOpenError();
  }

  return this.roku.document.xpathSelect('//*[substring(name(), string-length(name()) - string-length("Dialog") + 1) = "Dialog"]')!!.text;
}
