import { Driver } from '../../Driver';

export async function isKeyboardShown(this: Driver): Promise<boolean> {
  return await this.withContext('ECP', async () => {
    try {
      const element = await this.getElOrEls('xpath', '//*[self::Keyboard or self::MiniKeyboard or self::PinPad]');
      return element.isDisplayed;
    } catch (e) {
      return false;
    }
  });
}
