import { errors } from '@appium/base-driver';
import type { Element } from '@appium/types';
import type { Driver } from '../Driver.ts';
import * as appiumUtils from '../helpers/appium.js';

export function findElOrEls(
  strategy: string,
  selector: string,
  mult: true,
  context?: any
): Promise<Element[]>;

export function findElOrEls(
  strategy: string,
  selector: string,
  mult: false,
  context?: any
): Promise<Element>;

export async function findElOrEls(
  this: Driver,
  strategy: string,
  selector: string,
  mult: boolean,
  context: string
): Promise<Element | Element[]> {
  const selectors = context ? appiumUtils.fromWebDriverElement(context) : [];
  const attributes = appiumUtils.getSelectorFields(strategy, selector);
  const fields = attributes ? { '*': attributes } : undefined;

  if (mult) {
    const elements = await appiumUtils.retrying({
      timeout: this.implicitWaitMs,
      command: async () => {
        const document = await appiumUtils.getSource.call(this, fields);
        const parent = context
          ? appiumUtils.getElement({ elementId: context, document })
          : document.documentElement;

        return appiumUtils.getElements({ strategy, selector, parent });
      },
      validate: (elements, error) => {
        return !!error || (Array.isArray(elements) && elements.length > 0);
      },
    });

    return elements.map((_, index) =>
      appiumUtils.toWebDriverElement([
        ...selectors,
        { using: strategy, value: selector, index },
      ])
    );
  }

  await appiumUtils.retrying({
    timeout: this.implicitWaitMs || 0,
    command: async () => {
      const document = await appiumUtils.getSource.call(this, fields);
      const parent = context
        ? appiumUtils.getElement({ elementId: context, document })
        : document.documentElement;

      return appiumUtils.getElement({ strategy, selector, parent });
    },
    validate: (element, error) => {
      return !!element || !(error instanceof errors.NoSuchElementError);
    },
  });

  return appiumUtils.toWebDriverElement([
    ...selectors,
    { using: strategy, value: selector },
  ]);
}
