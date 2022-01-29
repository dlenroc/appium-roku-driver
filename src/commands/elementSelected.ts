import type { Driver } from '../Driver';

export async function elementSelected(this: Driver, elementId: string): Promise<boolean> {
  const element = await this.getElement(elementId);
  return element.isFocused;
}
