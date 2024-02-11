import { errors } from '@appium/base-driver';
import { util } from '@appium/support';
import type { Driver } from '../../Driver.ts';
import * as appiumUtils from '../../helpers/appium.js';
import * as domUtils from '../../helpers/dom.js';

export async function focus(
  this: Driver,
  elementId: string,
  options: { timeout: number }
) {
  const endTimestamp = Date.now() + options.timeout;
  const fields = {
    '*': [
      ...appiumUtils.odcFields.elementRectFields['*'],
      ...appiumUtils.odcFields.activeElementFields['*'],
    ],
  };

  let document = await appiumUtils.getSource.call(this, fields);
  let activeElement = domUtils.getActiveElement(document);
  let targetElement = appiumUtils.getElement({ elementId, document });
  let previousActiveElementId: string | undefined;

  if (!domUtils.isDisplayed(targetElement)) {
    throw new errors.ElementNotInteractableError(
      `Not visible element cannot be focused (elementId: ${elementId})`
    );
  }

  do {
    if (
      domUtils.contains(targetElement, activeElement) ||
      domUtils.contains(activeElement, targetElement)
    ) {
      return;
    }

    const targetRect = domUtils.getRect(targetElement);
    const currentRect = domUtils.getRect(activeElement);
    const direction =
      targetRect.y + targetRect.height <= currentRect.y
        ? 'Up'
        : targetRect.y >= currentRect.y + currentRect.height
        ? 'Down'
        : targetRect.x + targetRect.width <= currentRect.x
        ? 'Left'
        : targetRect.x >= currentRect.x + currentRect.width
        ? 'Right'
        : undefined;

    if (!direction) {
      throw new errors.UnknownError(
        `Unable to determine key to press to focus element ${elementId} ` +
          `(activeElement: ${domUtils.getXPath(activeElement)})`
      );
    }

    await this.performActions([
      {
        id: 'remote',
        type: 'key',
        actions: [
          { type: 'keyDown', value: direction },
          { type: 'keyUp', value: direction },
        ],
      },
    ]);

    previousActiveElementId = util.unwrapElement(
      appiumUtils.toWebDriverElement(activeElement)
    );

    const activeElementChanged = await appiumUtils.retrying({
      timeout: 2000,
      validate: (r, e) => !!(r || e),
      command: async () => {
        document = await appiumUtils.getSource.call(this, fields);
        activeElement = domUtils.getActiveElement(document);
        targetElement = appiumUtils.getElement({ elementId, document });

        if (!domUtils.isDisplayed(targetElement)) {
          throw new errors.ElementNotInteractableError(
            `After sending ${direction!} key, target element became invisible ` +
              `(elementId: ${elementId})`
          );
        }

        const previousActiveElement = appiumUtils.getElement({
          elementId: previousActiveElementId!,
          document,
        });

        return !(
          domUtils.contains(previousActiveElement, activeElement) ||
          domUtils.contains(activeElement, previousActiveElement)
        );
      },
    });

    if (!activeElementChanged) {
      throw new errors.UnknownError(
        `Focused element did not change after sending ${direction} key ` +
          `(activeElement: ${domUtils.getXPath(activeElement)})`
      );
    }
  } while (Date.now() < endTimestamp);

  throw new errors.UnknownError(
    `Unable to focus element ${elementId} within ${options.timeout}ms`
  );
}
