import { selectAll } from 'css-select';
import { adapter } from '../internal/css-select.js';

export function getElementsByCss(selector: string, parent: Element): Element[] {
  return selectAll(selector, parent, { adapter });
}
