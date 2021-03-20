import { Driver } from '../../Driver';

export async function elementEnabled(this: Driver, elementId: string): Promise<boolean> {
  return await this.elementDisplayed(elementId);
}
