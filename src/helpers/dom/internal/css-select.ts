import type { Options } from 'css-select';
import { getAttribute } from '../element/getAttribute.js';
import { getTagName } from '../element/getTagName.js';
import { getText as getTextContent } from '../element/getText.js';
import { isTag } from '../element/isTag.js';

function getAttributeValue(elem: Element, name: string): string | undefined {
  return getAttribute(elem, name) ?? undefined;
}

function getChildren(elem: Node): Node[] {
  return Array.from(elem.childNodes);
}

function getName(elem: Element): string {
  return getTagName(elem)?.toLowerCase();
}

function getParent(node: Element): Node | null {
  return node.parentNode;
}

function getSiblings(node: Node): Node[] {
  const parent = node.parentNode;
  return parent ? Array.from(parent.childNodes) : [node];
}

function prevElementSibling(node: Node): Element | null {
  for (let prev = node.previousSibling; prev; prev = prev.previousSibling) {
    if (isTag(prev)) {
      return prev;
    }
  }

  return null;
}

function getText(node: Node): string {
  if (!isTag(node)) return '';
  return getTextContent(node);
}

function hasAttrib(elem: Element, name: string): boolean {
  return elem.hasAttribute(name);
}

function removeSubsets(nodes: Node[]): Node[] {
  let idx = nodes.length;

  while (--idx >= 0) {
    const node = nodes[idx]!;

    if (idx > 0 && nodes.lastIndexOf(node, idx - 1) >= 0) {
      nodes.splice(idx, 1);
      continue;
    }

    for (
      let ancestor = node.parentNode;
      ancestor;
      ancestor = ancestor.parentNode
    ) {
      if (nodes.includes(ancestor)) {
        nodes.splice(idx, 1);
        break;
      }
    }
  }

  return nodes;
}

export const adapter = {
  isTag,
  getAttributeValue,
  getChildren,
  getName,
  getParent,
  getSiblings,
  prevElementSibling,
  getText,
  hasAttrib,
  removeSubsets,
} satisfies Options<Node, Element>['adapter'];
