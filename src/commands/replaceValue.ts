import type { Driver } from '../Driver.ts';

export async function replaceValue(
  this: Driver,
  value: string,
  elementId: string
): Promise<void> {
  const element = await this.getElement(elementId);
  await element.type(value);
}
