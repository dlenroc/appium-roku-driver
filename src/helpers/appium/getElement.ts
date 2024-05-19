import { errors } from '@appium/base-driver';
import * as domUtils from '../dom.js';
import { fromWebDriverElement } from './fromWebDriverElement.js';
import { getElements } from './getElements.js';
import { getSelector } from './getSelector.js';

export function getElement(
  options:
    | { elementId: string; document: Document }
    | { strategy: string; selector: string; parent: Element }
): Element {
  if ('elementId' in options) {
    let parent: Element = options.document.documentElement;

    try {
      const selectors = fromWebDriverElement(options.elementId);
      for (const selector of selectors) {
        if (selector.index) {
          const element = getElements({
            strategy: selector.using,
            selector: selector.value,
            parent,
          })[selector.index];

          if (!element) {
            throw new errors.NoSuchElementError(
              `Unable to locate element: ${options.elementId}`
            );
          }

          parent = element;
        } else {
          parent = getElement({
            strategy: selector.using,
            selector: selector.value,
            parent,
          });
        }
      }

      return parent;
    } catch {
      throw new errors.StaleElementReferenceError(
        `Element is no longer attached to the DOM: ${options.elementId}`
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
