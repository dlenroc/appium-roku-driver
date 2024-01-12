import type { Driver } from '../Driver.ts';
import * as appiumUtils from '../helpers/appium.js';
import * as domUtils from '../helpers/dom.js';

export async function getName(
  this: Driver,
  elementId: string
): Promise<string> {
  const document = await appiumUtils.getSource.call(this, { '*': [] });
  const element = appiumUtils.getElement({ elementId, document });
  return domUtils.getTagName(element);
}
