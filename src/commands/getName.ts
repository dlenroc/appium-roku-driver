import type { Driver } from '../Driver';

export async function getName(this: Driver, elementId: string): Promise<string> {
  const element = await this.getElement(elementId);
  return element.tag;
}
