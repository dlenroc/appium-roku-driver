import type { Driver } from '../Driver.ts';

export async function click(this: Driver, elementId: string): Promise<void> {
  const element = await this.getElement(elementId);
  await element.select();
}
