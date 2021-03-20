import { Driver } from '../../Driver';

export async function getWindowRect(this: Driver): Promise<{ x: number; y: number; width: number; height: number }> {
  const element = await this.getElOrEls('xpath', '//@bounds');
  return element.bounds;
}
