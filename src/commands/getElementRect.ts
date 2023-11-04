import { errors } from '@appium/base-driver';
import type { Rect } from '@appium/types';
import type { Driver } from '../Driver';

export async function getElementRect(this: Driver, elementId: string): Promise<Rect> {
  const element = await this.getElement(elementId);

  if (!element.bounds) {
    throw new errors.ElementNotVisibleError(undefined);
  }

  return element.bounds;
}
