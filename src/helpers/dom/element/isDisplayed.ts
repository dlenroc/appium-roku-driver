import { isTag } from './isTag.js';

export function isDisplayed(node: Node): boolean {
  for (; node && isTag(node); node = node.parentNode!) {
    if (
      node.getAttribute('visible') === 'false' ||
      node.getAttribute('opacity') === '0'
    ) {
      return false;
    }
  }

  return true;
}
