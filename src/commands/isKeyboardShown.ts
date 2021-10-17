import { Driver } from '../Driver';

export async function isKeyboardShown(this: Driver): Promise<boolean> {
  await this.roku.document.render();
  return this.roku.document.isKeyboardShown;
}
