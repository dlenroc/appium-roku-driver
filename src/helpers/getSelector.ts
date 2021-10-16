import base64 from 'base-64';
import cssEscape from 'cssesc';
import Driver from '..';

export function getSelector(this: Driver, strategy: string, selector?: string): ['css selector' | 'xpath', string] {
  if (selector === undefined) {
    return ['xpath', base64.decode(strategy)];
  }

  switch (strategy) {
    case 'id':
      const tag = this.roku.document.context === 'ECP' ? 'name' : 'id';
      return ['css selector', `[${tag}="${cssEscape(selector)}"]`];

    case 'tag name':
      return ['css selector', cssEscape(selector)];

    case 'xpath':
    case 'css selector':
      return [strategy, selector];

    default:
      throw Error(`${selector} is not a supported selector`);
  }
}
