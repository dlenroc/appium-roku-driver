import { util } from '@appium/support';
import type { Element } from '@appium/types';
import type { Driver } from '../Driver.ts';

export async function active(this: Driver): Promise<Element> {
  await this.document.render();
  const focusedElement = this.document.focusedElement;
  return util.wrapElement(Buffer.from(focusedElement.path).toString('base64'));
}
