import type { Rect } from '@appium/base-driver';
import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver';

export async function getElementRect(this: Driver, elementId: string): Promise<Rect> {
  const element = await this.helpers.getElement(elementId);

  if (!element.bounds) {
    throw new errors.ElementNotVisibleError();
  }

  return element.bounds;
}
