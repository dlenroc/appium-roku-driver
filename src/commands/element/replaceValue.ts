import { Driver } from '../../Driver';

export async function replaceValue(this: Driver, text: string, elementId: string): Promise<void> {
  const element = await this.getElOrEls('element-id', elementId);
  await element.type(text);
}
