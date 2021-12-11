import type { Driver } from '../Driver';

export async function getContexts(this: Driver): Promise<string[]> {
  return ['ECP', 'ODC'];
}
