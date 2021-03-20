import { Driver } from '../../Driver';

export async function active(this: Driver): Promise<any> {
  return this.findElOrEls('css selector', '[focused="true"]:not(:has([focused="true"]))');
}
