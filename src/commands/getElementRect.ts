import type { Rect } from '@appium/types';
import type { Driver } from '../Driver.ts';
import * as appiumUtils from '../helpers/appium.js';
import * as domUtils from '../helpers/dom.js';

export async function getElementRect(
  this: Driver,
  elementId: string
): Promise<Rect> {
  const fields = appiumUtils.odcFields.elementRectFields;
  const document = await appiumUtils.getSource.call(this, fields);
  const element = appiumUtils.getElement({ elementId, document });
  return domUtils.getRect(element);
}
