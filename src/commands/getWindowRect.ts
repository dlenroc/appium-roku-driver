import type { Rect } from '@appium/base-driver';
import type { Driver } from '../Driver';

export async function getWindowRect(this: Driver): Promise<Rect> {
  const element = await this.getElement('xpath', '//@bounds');
  return element.bounds!!;
}
