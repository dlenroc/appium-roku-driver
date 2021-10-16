import { Element } from '@appium/base-driver';
import { util } from '@appium/support';
import base64 from 'base-64';
import { Driver } from '../Driver';

export async function findElOrEls(this: Driver, strategy: string, selector: string, mult: boolean, context: string): Promise<Element | Element[]> {
  if (mult) {
    return findEls(this, strategy, selector, context);
  } else {
    return findEl(this, strategy, selector, context);
  }
}

async function findEl(driver: Driver, strategy: string, selector: string, context: string): Promise<Element> {
  const element = await driver.helpers.getElement(strategy, selector, context);
  return util.wrapElement(base64.encode(element.path));
}

async function findEls(driver: Driver, strategy: string, selector: string, context: string): Promise<Element[]> {
  const elements = await driver.helpers.getElements(strategy, selector, context);
  return elements.map((element) => util.wrapElement(base64.encode(element.path)));
}
