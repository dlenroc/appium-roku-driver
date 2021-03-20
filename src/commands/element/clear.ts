import { Driver } from '../../Driver';

export async function clear(this: Driver, elementId: string): Promise<void> {
  await this.replaceValue('', elementId);
}
