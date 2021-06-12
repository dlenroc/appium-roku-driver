import { Driver } from '../../Driver';

export async function submit(this: Driver, elementId: string): Promise<void> {
  const element = await this.getElOrEls('element-id', elementId);
  const isWithinKeyboard = !!element.xpathSelect('ancestor-or-self::*[substring(name(), string-length(name()) - string-length("Keyboard") + 1) = "Keyboard" or substring(name(), string-length(name()) - string-length("PinPad") + 1) = "PinPad"]');

  if (!isWithinKeyboard) {
    this.logger.errorAndThrow('Only elements within keyboard can be submitted');
  }

  await this.hideKeyboard();
}
