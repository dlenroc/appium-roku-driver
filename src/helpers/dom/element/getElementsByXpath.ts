import { select } from 'xpath';
import { isTag } from './isTag.js';

export function getElementsByXpath(
  selector: string,
  parent: Element
): Element[] {
  const results = select(selector, parent);
  if (!Array.isArray(results)) return [];
  return results.filter(isTag);
}
