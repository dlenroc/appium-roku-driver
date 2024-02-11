import type { Rect } from '@appium/types';
import { getAttribute } from './getAttribute.js';
import { isDisplayed } from './isDisplayed.js';
import { isTag } from './isTag.js';

export function getRect(element: Element): Rect {
  if (!isDisplayed(element)) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  let rect: Rect | null = null;

  for (
    let node: Node | null = element;
    node && isTag(node);
    node = node.parentNode
  ) {
    const inheritParentTransform =
      getAttribute(node, 'inheritParentTransform') !== 'false';

    if (!rect) {
      let bounds = getAttribute(node, 'bounds');
      if (bounds) {
        const [x, y, width, height] = JSON.parse(`[${bounds.slice(1, -1)}]`);
        rect = {
          x: Math.floor(x),
          y: Math.floor(y),
          width: Math.ceil(width),
          height: Math.ceil(height),
        };
      }

      if (inheritParentTransform) {
        continue;
      }
    }

    if (rect) {
      let translation = getAttribute(node, 'translation');
      if (translation) {
        const [x, y] = JSON.parse(`[${translation.slice(1, -1)}]`);
        rect.x += Math.floor(x);
        rect.y += Math.floor(y);
      }
    }

    if (!inheritParentTransform) {
      break;
    }
  }

  return rect || { x: 0, y: 0, width: 0, height: 0 };
}
