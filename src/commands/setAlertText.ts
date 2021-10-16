import { Driver } from '../Driver';

export async function setAlertText(this: Driver, text: string): Promise<void> {
  if (!(await this.isAlertShown())) {
    throw new this.errors.NoAlertOpenError();
  }

  const keyboard = this.roku.document.xpathSelect('//*[substring(name(), string-length(name()) - string-length("Dialog") + 1) = "Dialog"]//*[substring(name(), string-length(name()) - string-length("Keyboard") + 1) = "Keyboard" or substring(name(), string-length(name()) - string-length("PinPad") + 1) = "PinPad"]');

  if (!keyboard) {
    throw new this.errors.InvalidElementStateError('Keyboard is not present');
  }

  await keyboard.focus();
  await keyboard.type(text);
}
