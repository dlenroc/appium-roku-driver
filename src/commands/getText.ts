import type { Driver } from '../Driver.ts';

export async function getText(
  this: Driver,
  elementId: string
): Promise<string> {
  const element = await this.getElement(elementId);
  return element.text;
}
