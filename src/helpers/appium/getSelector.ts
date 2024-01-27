import cssEscape from 'cssesc';

export function getSelector(
  strategy: string,
  selector: string
): ['css selector' | 'xpath', string] {
  switch (strategy) {
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
