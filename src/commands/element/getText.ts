import { Driver } from '../../Driver';

export async function getText(this: Driver, elementId: string): Promise<string> {
  const element = await this.getElOrEls('element-id', elementId);
  return element.text;
}
