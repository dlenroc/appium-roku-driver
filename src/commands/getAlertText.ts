import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver';
import { DIALOG } from '../Elements';

export async function getAlertText(this: Driver): Promise<string | null> {
  if (!(await this.isAlertShown())) {
    throw new errors.NoAlertOpenError(undefined);
  }

  return this.roku.document.xpathSelect(`//*[${DIALOG}]`)!!.text;
}
