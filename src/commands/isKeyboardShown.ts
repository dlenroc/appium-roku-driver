import type { Driver } from '../Driver.ts';

export async function isKeyboardShown(this: Driver): Promise<boolean> {
  await this.document.render();
  return this.document.isKeyboardShown;
}
