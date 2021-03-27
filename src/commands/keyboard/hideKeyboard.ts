import { Driver } from '../../Driver';

export async function hideKeyboard(this: Driver): Promise<void> {
  const keyboard = await this.getElOrEls('xpath', '//*[self::Keyboard or self::MiniKeyboard or self::PinPad]');
  const submitButton = keyboard.xpathSelect('./ancestor-or-self::*[self::Dialog or self::KeyboardDialog or self::PinDialog or self::ProgressDialog]//ButtonGroup');

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
