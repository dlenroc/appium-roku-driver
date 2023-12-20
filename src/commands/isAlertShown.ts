import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver.ts';
import { DIALOG } from '../Elements.js';

export async function isAlertShown(this: Driver): Promise<boolean> {
  try {
    await this.getElement('xpath', `//*[${DIALOG}]`);

    return true;
  } catch (e) {
    if (e instanceof errors.NoSuchElementError) {
      return false;
    }

    throw e;
  }
}
