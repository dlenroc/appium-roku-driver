import { Driver } from '../../Driver';

export async function getCurrentContext(this: Driver): Promise<string> {
  return this.roku.document.context;
}
