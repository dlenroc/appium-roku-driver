import type { Driver } from '../Driver.ts';

export async function getContexts(this: Driver): Promise<string[]> {
  return ['ECP', 'ODC'];
}
