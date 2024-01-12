import type { Driver } from '../Driver.ts';
import * as appiumUtils from '../helpers/appium.js';
import * as domUtils from '../helpers/dom.js';

export async function getText(
  this: Driver,
  elementId: string
): Promise<string> {
  const fields = appiumUtils.odcFields.elementTextFields;
  const document = await appiumUtils.getSource.call(this, fields);
  const element = appiumUtils.getElement({ elementId, document });
  return domUtils.getText(element);
}
