import { util } from '@appium/support';
import type { Element } from '@appium/types';
import type { Selector } from './Selector.ts';

export function fromWebDriverElement(value: string | Element): Selector[] {
  const id = typeof value === 'string' ? value : util.unwrapElement(value);
  return JSON.parse(Buffer.from(id, 'base64').toString('utf8'));
}
