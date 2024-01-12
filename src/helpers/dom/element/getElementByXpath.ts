import { select1 } from 'xpath';
import { isTag } from './isTag.js';

export function getElementByXpath(
  selector: string,
  parent: Element
): Element | null {
  const result = select1(selector, parent);
  if (!result || typeof result !== 'object') return null;
  return isTag(result) ? result : null;
}
