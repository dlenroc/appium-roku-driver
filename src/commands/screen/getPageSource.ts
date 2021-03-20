import { Driver } from '../../Driver';

export async function getPageSource(this: Driver): Promise<string> {
  await this.roku.document.render();
  return this.roku.document.toString();
}
