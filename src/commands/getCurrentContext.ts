import { Driver } from '../Driver';

export async function getCurrentContext(this: Driver): Promise<string | null> {
  return this.roku.document.context;
}
