import type { Driver } from '../Driver';

export async function hideKeyboard(this: Driver, strategy?: string, key?: string, keyCode?: string, keyName?: string): Promise<void> {
  const keyboard = await this.helpers.getElement('xpath', '//*[substring(name(), string-length(name()) - string-length("Keyboard") + 1) = "Keyboard" or substring(name(), string-length(name()) - string-length("PinPad") + 1) = "PinPad"]');
  const submitButton = keyboard.xpathSelect('./ancestor-or-self::*[substring(name(), string-length(name()) - string-length("Dialog") + 1) = "Dialog"]//*[substring(name(), string-length(name()) - string-length("Button") + 1) = "Button"]');

  if (submitButton) {
    await submitButton.select();
  } else {
    await this.roku.ecp.keypress('Enter');
  }

  await this.helpers.waitForCondition({
    error: 'Keyboard is still visible',
    condition: async () => {
      const isKeyboardShown = await this.isKeyboardShown();
      return !isKeyboardShown;
    },
  });
}
