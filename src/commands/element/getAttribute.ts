import { Driver } from '../../Driver';

export async function getAttribute(this: Driver, name: string, elementId: string): Promise<string | null> {
  const element = await this.getElOrEls('element-id', elementId);
  return element.attributes[name];
}
