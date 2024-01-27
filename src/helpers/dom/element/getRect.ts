import type { Rect } from '@appium/types';
import { getAttribute } from './getAttribute.js';
import { isDisplayed } from './isDisplayed.js';
import { isTag } from './isTag.js';

export function getRect(element: Element, isRoot: boolean = true): Rect {
  if (isRoot && !isDisplayed(element)) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  let bounds = getAttribute(element, 'bounds');
  if (bounds) {
    const [x, y, width, height] = JSON.parse(`[${bounds.slice(1, -1)}]`);
    return {
      x: Math.floor(x),
      y: Math.floor(y),
      width: Math.ceil(width),
      height: Math.ceil(height),
    };
  }

  let margins:
    | undefined
    | { top: number; left: number; bottom: number; right: number };

  const children = element.childNodes;
  for (let i = 0, n = children.length; i < n; i++) {
    const node = children[i]!;
    if (
      !isTag(node) ||
      node.getAttribute('visible') === 'false' ||
      node.getAttribute('opacity') === '0'
    ) {
      continue;
    }

    const childRect = getRect(node, false);
    const childMargins = {
      top: childRect.y,
      left: childRect.x,
      bottom: childRect.y + childRect.height,
      right: childRect.x + childRect.width,
    };

    if (!margins) {
      margins = childMargins;
      continue;
    }

    margins.top = Math.min(margins.top, childMargins.top);
    margins.left = Math.min(margins.left, childMargins.left);
    margins.bottom = Math.max(margins.bottom, childMargins.bottom);
    margins.right = Math.max(margins.right, childMargins.right);
  }

  if (!margins) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  return {
    x: margins.left,
    y: margins.top,
    width: margins.right - margins.left,
    height: margins.bottom - margins.top,
  };
}
