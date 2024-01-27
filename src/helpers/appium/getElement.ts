import { errors } from '@appium/base-driver';
import * as domUtils from '../dom.js';
import { getSelector } from './getSelector.js';

export function getElement(
  options:
    | { elementId: string; document: Document }
    | { strategy: string; selector: string; parent: Element }
): Element {
  if ('elementId' in options) {
    const strategy = 'xpath';
    const selector = Buffer.from(options.elementId, 'base64').toString();
    const parent = options.document.documentElement;

    try {
      return getElement({ strategy, selector, parent });
    } catch {
      throw new errors.StaleElementReferenceError(
        `Unable to locate element: ${selector}`
      );
    }
  }

  const [strategy, selector] = getSelector(options.strategy, options.selector);

  let element: Element | null = null;

  switch (strategy) {
    case 'css selector':
      element = domUtils.getElementByCss(selector, options.parent);
      break;
    case 'xpath':
      element = domUtils.getElementByXpath(selector, options.parent);
      break;
  }

  if (!element) {
    throw new errors.NoSuchElementError(
      `Unable to locate element: ${selector}`
    );
  }

  return element;
}
