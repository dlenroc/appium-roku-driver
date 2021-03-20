import { Driver } from '../../Driver';

export async function elementDisplayed(this: Driver, elementId: string): Promise<boolean> {
  const element = await this.getElOrEls('element-id', elementId);
  return element.isDisplayed;
}
