import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver';

export async function isAlertShown(this: Driver): Promise<boolean> {
  try {
    await this.helpers.getElement('xpath', '//*[substring(name(), string-length(name()) - string-length("Dialog") + 1) = "Dialog"]');

    return true;
  } catch (e) {
    if (e instanceof errors.NoSuchElementError) {
      return false;
    }

    throw e;
  }
}
