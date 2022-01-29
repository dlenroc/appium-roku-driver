import type { Element } from '@dlenroc/roku';
import type { Driver } from '../Driver';

export async function getElements(this: Driver, strategy: string, selector: string, context?: string): Promise<Element[]> {
  [strategy, selector] = this.getSelector(strategy, selector);

  let parent: Element;
  let elements: Element[] = [];

  if (context) {
    parent = await this.getElement(context);
  } else {
    await this.roku.document.render();
    parent = this.roku.document;
  }

  switch (strategy) {
    case 'css selector':
      elements = parent.cssSelectAll(selector);
      break;
    case 'xpath':
      elements = parent.xpathSelectAll(selector);
      break;
  }

  return elements;
}
