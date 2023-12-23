import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver.ts';
import { DIALOG } from '../Elements.js';

export async function getAlertText(this: Driver): Promise<string | null> {
  if (!(await this.isAlertShown())) {
    throw new errors.NoAlertOpenError(undefined);
  }

  return this.document.xpathSelect(`//*[${DIALOG}]`).text;
}
