import type { Driver } from '../Driver.ts';
import * as appiumUtils from '../helpers/appium.js';
import * as domUtils from '../helpers/dom.js';

export async function elementDisplayed(
  this: Driver,
  elementId: string
): Promise<boolean> {
  const fields = appiumUtils.odcFields.elementDisplayedFields;
  const document = await appiumUtils.getSource.call(this, fields);
  const element = appiumUtils.getElement({ elementId, document });
  return domUtils.isDisplayed(element);
}
