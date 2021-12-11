import type { Driver } from '../Driver';

export async function elementSelected(this: Driver, elementId: string): Promise<boolean> {
  const element = await this.helpers.getElement(elementId);
  return element.isFocused;
}
