import { Driver } from '../../Driver';

export async function replaceValue(this: Driver, text: string, elementId: string): Promise<void> {
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

    const input = keyboard?.xpathSelect('.//TextEditBox');
    let cursor = keyboard?.xpathSelect('.//*[contains(@uri, "cursor_textInput")]');
    if (cursor && !cursor.bounds) {
      cursor = [cursor, ...cursor.parents].find((el) => el.attributes.bounds);
    }

    if (input && cursor && cursor.bounds.x > cursor.bounds.y) {
      for (let i = 0; i < input.text.length; i++) {
        await this.roku.ecp.keypress('Backspace');
      }
    }

    if (text) {
      await this.roku.ecp.type(text);
    }

    if (!isWithinKeyboard) {
      await this.hideKeyboard();
    }
  });
}
