import { DOMParser } from '@xmldom/xmldom';

const parser = new DOMParser({ locator: false });

export function parse(xml: string): Document {
  return parser.parseFromString(xml);
}
