import { Driver } from '../../Driver';

export async function setValue(this: Driver, text: string, elementId: string): Promise<void> {
  const element = await this.getElOrEls('element-id', elementId);
  const isWithinKeyboard = !!element.xpathSelect('ancestor-or-self::*[self::Keyboard or self::MiniKeyboard or self::PinPad]');

  if (!isWithinKeyboard) {
    await this.click(elementId);
    await this.waitForCondition({
      error: 'Keyboard is not visible',
      condition: async () => {
        return await this.isKeyboardShown();
      },
    });
  }

  await this.withContext('ECP', async () => {
    const keyboard = this.roku.document.xpathSelect('//*[self::Keyboard or self::MiniKeyboard or self::PinPad]');
    const key = keyboard?.xpathSelectAll('.//VKBKey').find((element) => element.isDisplayed && !element.isFocused);
    if (key) {
      await key.focus();
    }

    if (text) {
      await this.roku.ecp.type(text);
    }

    if (!isWithinKeyboard) {
      await this.hideKeyboard();
    }
  });
}
