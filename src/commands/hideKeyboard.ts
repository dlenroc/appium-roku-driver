import type { Driver } from '../Driver';
import { BUTTON, DIALOG, KEYBOARD } from '../Elements';

export async function hideKeyboard(this: Driver, strategy?: string, key?: string, keyCode?: string, keyName?: string): Promise<void> {
  const keyboard = await this.getElement('xpath', `//*[${KEYBOARD}]`);
  const submitButton = keyboard.xpathSelect(`./ancestor-or-self::*[${DIALOG}]//*[${BUTTON}]`);

  if (submitButton) {
    await submitButton.select();
  } else {
    await this.roku.ecp.keypress('Enter');
  }

  await this.waitForCondition({
    error: 'Keyboard is still visible',
    condition: async () => {
      const isKeyboardShown = await this.isKeyboardShown();
      return !isKeyboardShown;
    },
  });
}
