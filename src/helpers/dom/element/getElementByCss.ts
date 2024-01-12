import { selectOne } from 'css-select';
import { adapter } from '../internal/css-select.js';

export function getElementByCss(
  selector: string,
  parent: Element
): Element | null {
  return selectOne(selector, parent, { adapter });
}
