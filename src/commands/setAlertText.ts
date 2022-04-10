import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver';

export async function setAlertText(this: Driver, text: string): Promise<void> {
  if (!(await this.isAlertShown())) {
    throw new errors.NoAlertOpenError(undefined);
  }

  const keyboard = this.roku.document.xpathSelect('//*[substring(name(), string-length(name()) - string-length("Dialog") + 1) = "Dialog"]//*[substring(name(), string-length(name()) - string-length("Keyboard") + 1) = "Keyboard" or substring(name(), string-length(name()) - string-length("PinPad") + 1) = "PinPad"]');

  if (!keyboard) {
    throw new errors.InvalidElementStateError('Keyboard is not present');
  }

  await keyboard.type(text);
}
