import type { Driver } from '../Driver.ts';
import * as appiumUtils from '../helpers/appium.js';
import * as domUtils from '../helpers/dom.js';

export async function getProperty(
  this: Driver,
  name: string,
  elementId: string
): Promise<string | null> {
  if (name === 'isFocused') {
    const fields = appiumUtils.odcFields.activeElementFields;
    const document = await appiumUtils.getSource.call(this, fields);
    const element = appiumUtils.getElement({ elementId, document });
    const activeElement = domUtils.getActiveElement(document);
    return String(element === activeElement);
  }

  if (name === 'isInFocusChain') {
    const fields = appiumUtils.odcFields.activeElementFields;
    const document = await appiumUtils.getSource.call(this, fields);
    const element = appiumUtils.getElement({ elementId, document });
    const activeElement = domUtils.getActiveElement(document);
    return String(domUtils.contains(element, activeElement));
  }

  if (name === 'isInFocusHierarchy') {
    const fields = appiumUtils.odcFields.activeElementFields;
    const document = await appiumUtils.getSource.call(this, fields);
    const element = appiumUtils.getElement({ elementId, document });
    const activeElement = domUtils.getActiveElement(document);
    return String(
      domUtils.contains(activeElement, element) ||
        domUtils.contains(element, activeElement)
    );
  }

  return null;
}
