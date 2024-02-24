import type { Driver } from '../Driver.ts';
import * as appiumUtils from '../helpers/appium.js';
import * as domUtils from '../helpers/dom.js';

export async function getAttribute(
  this: Driver,
  name: string,
  elementId: string
): Promise<string | null> {
  const document = await appiumUtils.getSource.call(this, { '*': [name] });
  const element = appiumUtils.getElement({ elementId, document });
  return domUtils.getAttribute(element, name);
}
