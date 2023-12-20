import type { Driver } from '../Driver.ts';

export async function getCurrentContext(this: Driver): Promise<string | null> {
  return this.document.context;
}
