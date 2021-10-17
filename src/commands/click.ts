import { Driver } from '../Driver';

export async function click(this: Driver, elementId: string): Promise<void> {
  const element = await this.helpers.getElement(elementId);
  await element.select();
}
