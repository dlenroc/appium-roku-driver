import type { Element } from '@appium/base-driver';
import { util } from '@appium/support';
import base64 from 'base-64';
import type { Driver } from '../Driver';

export async function active(this: Driver): Promise<Element> {
  await this.roku.document.render();
  const focusedElement = this.roku.document.focusedElement;
  return util.wrapElement(base64.encode(focusedElement.path));
}
