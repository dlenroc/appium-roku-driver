import type { Driver } from '../Driver.ts';

export async function clear(this: Driver, elementId: string): Promise<void> {
  await this.replaceValue('', elementId);
}
