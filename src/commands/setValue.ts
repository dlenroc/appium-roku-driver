import type { Driver } from '../Driver';

export async function setValue(this: Driver, text: string, elementId: string): Promise<void> {
  const element = await this.getElement(elementId);
  await element.append(text);
}
