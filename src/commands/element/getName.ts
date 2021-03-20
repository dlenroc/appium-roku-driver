import { Driver } from '../../Driver';

export async function getName(this: Driver, elementId: string): Promise<string> {
  const element = await this.getElOrEls('element-id', elementId);
  return element.tag;
}
