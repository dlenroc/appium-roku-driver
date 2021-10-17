import { Driver } from '../Driver';

export async function getText(this: Driver, elementId: string): Promise<string> {
  const element = await this.helpers.getElement(elementId);
  return element.text;
}
