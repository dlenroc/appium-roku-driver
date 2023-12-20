import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver.ts';
import { DIALOG, KEYBOARD } from '../Elements.js';

export async function setAlertText(this: Driver, text: string): Promise<void> {
  if (!(await this.isAlertShown())) {
    throw new errors.NoAlertOpenError(undefined);
  }

  const keyboard = this.document.xpathSelect(`//*[${DIALOG}]//*[${KEYBOARD}]`);

  if (!keyboard) {
    throw new errors.InvalidElementStateError('Keyboard is not present');
  }

  await keyboard.type(text);
}
