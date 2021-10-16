import { Rect } from '@appium/base-driver';
import { Driver } from '../Driver';

export async function getWindowRect(this: Driver): Promise<Rect> {
  const element = await this.helpers.getElement('xpath', '//@bounds');
  return element.bounds!!;
}
