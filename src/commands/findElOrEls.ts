import { errors } from '@appium/base-driver';
import { util } from '@appium/support';
import { Element } from '@appium/types';
import type { Element as RokuElement } from '@dlenroc/roku';
import base64 from 'base-64';
import type { Driver } from '../Driver';

export function findElOrEls(strategy: string, selector: string, mult: false, context?: any): Promise<Element>;
export function findElOrEls(strategy: string, selector: string, mult: true, context?: any): Promise<Element[]>;
export async function findElOrEls(this: Driver, strategy: string, selector: string, mult: boolean, context: string): Promise<Element | Element[]> {
  if (mult) {
    return findEls.call(this, strategy, selector, context);
  } else {
    return findEl.call(this, strategy, selector, context);
  }
}

async function findEl(this: Driver, strategy: string, selector: string, context: string): Promise<Element> {
  let element: RokuElement;

  if (this.implicitWaitMs) {
    // @ts-ignore
    element = await this.retrying({
      timeout: this.implicitWaitMs,
      command: () => this.getElement(strategy, selector, context),
      validate: (element, error) => !!element || !(error instanceof errors.NoSuchElementError),
    });
  } else {
    element = await this.getElement(strategy, selector, context);
  }

  return util.wrapElement(base64.encode(element.path));
}

async function findEls(this: Driver, strategy: string, selector: string, context: string): Promise<Element[]> {
  let elements: RokuElement[];

  if (this.implicitWaitMs) {
    // @ts-ignore
    elements = await this.retrying({
      timeout: this.implicitWaitMs,
      command: () => this.getElements(strategy, selector, context),
      validate: (elements, error) => !!error || (Array.isArray(elements) && elements.length > 0),
    });
  } else {
    elements = await this.getElements(strategy, selector, context);
  }

  return elements.map((element) => util.wrapElement(base64.encode(element.path)));
}
