import { Driver } from '../../Driver';

export async function elementSelected(this: Driver, elementId: string): Promise<boolean> {
  const element = await this.getElOrEls('element-id', elementId);
  return element.isFocused;
}
