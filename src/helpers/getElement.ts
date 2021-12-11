import { errors } from '@appium/base-driver';
import type { Element } from '@dlenroc/roku';
import type { Driver } from '../Driver';

export async function getElement(this: Driver, strategy: string, selector?: string, context?: string): Promise<Element> {
  const hasSelector = !!selector;

  [strategy, selector] = this.helpers.getSelector(strategy, selector);

  let parent: Element;
  let element: Element | null = null;

  if (context) {
    parent = await this.helpers.getElement(context);
  } else {
    await this.roku.document.render();
    parent = this.roku.document;
  }

  switch (strategy) {
    case 'css selector':
      element = parent.cssSelect(selector);
      break;
    case 'xpath':
      element = parent.xpathSelect(selector);
      break;
  }

  if (!element) {
    if (hasSelector) {
      throw new errors.NoSuchElementError(`Unable to locate element: ${selector}`);
    } else {
      throw new errors.StaleElementReferenceError(`Unable to locate element: ${selector}`);
    }
  }

  return element;
}
