import { util } from '@appium/support';
import type { Element } from '@appium/types';
import { getXPath } from '../dom.js';
import type { Selector } from './Selector.ts';

export function toWebDriverElement(value: Node | Selector[]): Element {
  value = Array.isArray(value)
    ? value
    : [{ using: 'xpath', value: getXPath(value) }];

  return util.wrapElement(
    Buffer.from(JSON.stringify(value)).toString('base64')
  );
}
