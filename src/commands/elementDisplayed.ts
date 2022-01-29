import type { Driver } from '../Driver';

export async function elementDisplayed(this: Driver, elementId: string): Promise<boolean> {
  const element = await this.getElement(elementId);
  return element.isDisplayed;
}
