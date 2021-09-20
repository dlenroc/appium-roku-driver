import { Element, SelectorStrategy } from '@appium/base-driver';
import { util } from '@appium/support';
import { Element as XMLElement } from '@dlenroc/roku';
import base64 from 'base-64';
import cssEscape from 'cssesc';
import { Driver } from '../../Driver';

export async function findElOrEls<T extends boolean = false>(this: Driver, strategy: SelectorStrategy, selector: string, multiple?: T, parent?: string): Promise<T extends true ? Element[] : Element> {
  const elOrEls = await this.getElOrEls(strategy, selector, multiple, parent);

  if (multiple) {
    const elements = elOrEls as XMLElement[];
    return elements.map((el) => util.wrapElement(base64.encode(el.path))) as any;
  } else {
    const element = elOrEls as XMLElement;
    return util.wrapElement(base64.encode(element.path)) as any;
  }
}

export async function getElOrEls<T extends boolean = false>(this: Driver, strategy: SelectorStrategy, selector: string, multiple?: T, parent?: string): Promise<T extends true ? XMLElement[] : XMLElement> {
  switch (strategy) {
    case 'id':
      const tag = this.roku.document.context === 'ECP' ? 'name' : 'id';
      return this.getElOrEls('css selector', `[${tag}="${cssEscape(selector)}"]`, multiple, parent);
    case 'tag name':
      return this.getElOrEls('css selector', cssEscape(selector), multiple, parent);
  }

  const self = this;

  if (!parent) {
    await this.roku.document.render();
  }

  let parentElement: XMLElement = this.roku.document;
  if (parent) {
    parentElement = await this.getElOrEls('element-id', parent);
  }

  switch (strategy) {
    case 'css selector':
      return findBy(multiple, {
        find: () => parentElement.cssSelect(selector, this.implicitWaitMs / 1000),
        finds: () => parentElement.cssSelectAll(selector, this.implicitWaitMs / 1000),
      });
    case 'xpath':
      return findBy(multiple, {
        find: () => parentElement.xpathSelect(selector, this.implicitWaitMs / 1000),
        finds: () => parentElement.xpathSelectAll(selector, this.implicitWaitMs / 1000),
      });
    case 'element-id':
      selector = base64.decode(selector);
      return findBy(multiple, {
        find: async () => parentElement.xpathSelect(selector),
        finds: async () => parentElement.xpathSelectAll(selector),
      });
    default:
      return this.logger.errorAndThrow(new this.errors.NoSuchElementError());
  }

  async function findBy<T extends boolean = false>(multiple: T | undefined, { find, finds }: { find: () => Promise<XMLElement | null>; finds: () => Promise<XMLElement[]> }): Promise<T extends true ? XMLElement[] : XMLElement> {
    if (multiple) {
      // @ts-ignore
      return finds();
    }

    const element = await find();
    if (!element) {
      throw new self.errors.NoSuchElementError();
    }

    // @ts-ignore
    return element;
  }
}
