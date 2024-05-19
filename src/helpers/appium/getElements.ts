import * as domUtils from '../dom.js';
import { getSelector } from './getSelector.js';

export function getElements(options: {
  strategy: string;
  selector: string;
  parent: Element;
}): Element[] {
  const [strategy, selector] = getSelector(options.strategy, options.selector);

  switch (strategy) {
    case 'css selector':
      return domUtils.getElementsByCss(selector, options.parent);
    case 'xpath':
      return domUtils.getElementsByXpath(selector, options.parent);
  }
}
