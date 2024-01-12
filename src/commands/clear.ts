import type { Driver } from '../Driver.ts';

export async function clear(this: Driver, elementId: string): Promise<void> {
  const text = await this.getText(elementId);
  await this.setValue('\uE003'.repeat(text.length), elementId);
}
