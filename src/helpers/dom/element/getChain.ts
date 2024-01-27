import { isTag } from './isTag.js';

export function getChain(node: Element): Element[] {
  const chain = [];

  for (
    let element: Node | null = node;
    element && isTag(element);
    element = element?.parentNode
  ) {
    chain.push(element);
  }

  return chain;
}
