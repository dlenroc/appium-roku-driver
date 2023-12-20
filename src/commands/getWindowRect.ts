import type { Rect } from '@appium/types';
import type { Driver } from '../Driver.ts';

export async function getWindowRect(this: Driver): Promise<Rect> {
  const element = await this.getElement('xpath', '//@bounds');
  return element.bounds!!;
}
