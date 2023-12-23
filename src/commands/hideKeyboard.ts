import * as ecp from '@dlenroc/roku-ecp';
import type { Driver } from '../Driver.ts';
import { BUTTON, DIALOG, KEYBOARD } from '../Elements.js';

export async function hideKeyboard(this: Driver): Promise<boolean> {
  const keyboard = await this.getElement('xpath', `//*[${KEYBOARD}]`);
  const submitButton = keyboard.xpathSelect(
    `./ancestor-or-self::*[${DIALOG}]//*[${BUTTON}]`
  );

  if (submitButton) {
    await submitButton.select();
  } else {
    await ecp.keypress(this.sdk.ecp, { key: 'Enter' });
  }

  await this.waitForCondition({
    error: 'Keyboard is still visible',
    condition: async () => {
      const isKeyboardShown = await this.isKeyboardShown();
      return !isKeyboardShown;
    },
  });

  return true;
}
