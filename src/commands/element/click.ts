import { Driver } from '../../Driver';

export async function click(this: Driver, elementId: string): Promise<void> {
  const element = await this.getElOrEls('element-id', elementId);
  await element.select();
}
