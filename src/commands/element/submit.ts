import { Driver } from '../../Driver';

export async function submit(this: Driver, elementId: string): Promise<void> {
  const element = await this.getElOrEls('element-id', elementId);
  const isWithinKeyboard = !!element.xpathSelect('ancestor-or-self::*[self::Keyboard or self::MiniKeyboard or self::PinPad]');

  if (!isWithinKeyboard) {
    this.logger.errorAndThrow('Only elements within keyboard can be submitted');
  }

  await this.hideKeyboard();
}
