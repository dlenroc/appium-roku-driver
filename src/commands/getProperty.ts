import type { Driver } from '../Driver';

export async function getProperty(this: Driver, name: string, elementId: string): Promise<string | null> {
  const element = await this.getElement(elementId);
  return element.attributes[name];
}
