import { Rect } from '@appium/base-driver';
import { Driver } from '../Driver';

export async function getElementRect(this: Driver, elementId: string): Promise<Rect> {
  const element = await this.helpers.getElement(elementId);

  if (!element.bounds) {
    throw new this.errors.ElementNotVisibleError();
  }

  return element.bounds;
}
