import base64 from 'base-64';
import cssEscape from 'cssesc';
import type { Driver } from '../Driver.ts';

export function getSelector(
  this: Driver,
  strategy: string,
  selector?: string
): ['css selector' | 'xpath', string] {
  if (selector === undefined) {
    return ['xpath', base64.decode(strategy)];
  }

  switch (strategy) {
    case 'id':
      const tag = this.document.context === 'ECP' ? 'name' : 'id';
      return [
        'css selector',
        `[${tag}=${cssEscape(selector, { wrap: true })}]`,
      ];

    case 'tag name':
      return ['css selector', cssEscape(selector, { isIdentifier: true })];

    case 'link text':
      return ['css selector', `[text=${cssEscape(selector, { wrap: true })}]`];

    case 'partial link text':
      return ['css selector', `[text*=${cssEscape(selector, { wrap: true })}]`];

    case 'xpath':
    case 'css selector':
      return [strategy, selector];

    default:
      throw Error(`${selector} is not a supported selector`);
  }
}
