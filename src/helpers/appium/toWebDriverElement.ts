import { util } from '@appium/support';
import type { Element } from '@appium/types';
import { getXPath } from '../dom/element/getXPath.js';

export function toWebDriverElement(node: Node): Element {
  return util.wrapElement(Buffer.from(getXPath(node)).toString('base64'));
}
