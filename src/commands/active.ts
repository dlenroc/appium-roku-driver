import type { Element } from '@appium/types';
import type { Driver } from '../Driver.ts';
import * as appiumUtils from '../helpers/appium.js';
import * as domUtils from '../helpers/dom.js';

export async function active(this: Driver): Promise<Element> {
  const fields = appiumUtils.odcFields.activeElementFields;
  const document = await appiumUtils.getSource.call(this, fields);
  const element = domUtils.getActiveElement(document);
  return appiumUtils.toWebDriverElement(element);
}
