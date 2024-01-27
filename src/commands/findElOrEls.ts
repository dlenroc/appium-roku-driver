import { errors } from '@appium/base-driver';
import type { Element } from '@appium/types';
import type { Driver } from '../Driver.ts';
import * as appiumUtils from '../helpers/appium.js';
import { isTag } from '../helpers/dom.js';

export function findElOrEls(
  strategy: string,
  selector: string,
  mult: false,
  context?: any
): Promise<Element>;

export function findElOrEls(
  strategy: string,
  selector: string,
  mult: true,
  context?: any
): Promise<Element[]>;

export async function findElOrEls(
  this: Driver,
  strategy: string,
  selector: string,
  mult: boolean,
  context: string
): Promise<Element | Element[]> {
  const attributes = appiumUtils.getSelectorFields(strategy, selector);
  const fields = attributes ? { '*': attributes } : undefined;
  const requireElementId = attributes?.some((attr) => attr === 'id');

  if (mult) {
    const elements = await appiumUtils.retrying({
      timeout: this.implicitWaitMs,
      command: async () => {
        const document = await appiumUtils.getSource.call(this, fields);
        if (requireElementId) {
          generateIds(document);
        }

        const parent = context
          ? appiumUtils.getElement({ elementId: context, document })
          : document.documentElement;

        return appiumUtils.getElements({ strategy, selector, parent });
      },
      validate: (elements, error) => {
        return !!error || (Array.isArray(elements) && elements.length > 0);
      },
    });

    return elements.map(appiumUtils.toWebDriverElement);
  }

  const element = await appiumUtils.retrying({
    timeout: this.implicitWaitMs || 0,
    command: async () => {
      const document = await appiumUtils.getSource.call(this, fields);
      if (requireElementId) {
        generateIds(document);
      }

      const parent = context
        ? appiumUtils.getElement({ elementId: context, document })
        : document.documentElement;

      return appiumUtils.getElement({ strategy, selector, parent });
    },
    validate: (element, error) => {
      return !!element || !(error instanceof errors.NoSuchElementError);
    },
  });

  return appiumUtils.toWebDriverElement(element);
}

function generateIds(node: Node): void {
  if (isTag(node) && !node.hasAttribute('id')) {
    const id = node.getAttribute('uiElementId') || node.getAttribute('name');
    if (id) {
      node.setAttribute('id', id);
    }
  }

  if (node.hasChildNodes()) {
    for (let i = 0, n = node.childNodes.length; i < n; i++) {
      generateIds(node.childNodes[i]!);
    }
  }
}
