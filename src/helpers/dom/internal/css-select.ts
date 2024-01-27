import type { Options } from 'css-select';
import { getAttribute } from '../element/getAttribute.js';
import { getTagName } from '../element/getTagName.js';
import { isTag } from '../element/isTag.js';

export function existsOne(
  test: (elem: Element) => boolean,
  nodes: Node[] | NodeListOf<Node>
): boolean {
  for (let i = 0, n = nodes.length; i < n; i++) {
    const node = nodes[i]!;
    if (!isTag(node)) continue;
    return test(node) || existsOne(test, node.childNodes);
  }

  return false;
}

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
  return getAttribute(node, 'text') ?? '';
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

function findAll(
  test: (value: Element) => boolean,
  nodes: NodeListOf<ChildNode> | Node[]
): Element[] {
  const result = [];
  const nodeStack = [nodes];
  const indexStack = [0];

  for (;;) {
    if (indexStack[0]! >= nodeStack[0]!.length) {
      if (nodeStack.length === 1) {
        return result;
      }

      nodeStack.shift();
      indexStack.shift();
      continue;
    }

    const elem = nodeStack[0]![indexStack[0]++]!;

    if (!isTag(elem)) continue;
    if (test(elem)) result.push(elem);

    if (elem.childNodes.length > 0) {
      indexStack.unshift(0);
      nodeStack.unshift(elem.childNodes);
    }
  }
}

function findOne(
  test: (value: Element) => boolean,
  nodes: NodeListOf<Node> | Node[]
): Element | null {
  let element: Element | null = null;

  for (let i = 0, n = nodes.length; i < n && !element; i++) {
    const node = nodes[i]!;

    if (isTag(node)) {
      if (test(node)) {
        element = node;
      } else {
        element = findOne(test, node.childNodes);
      }
    }
  }

  return element;
}

export const adapter = {
  isTag,
  existsOne,
  getAttributeValue,
  getChildren,
  getName,
  getParent,
  getSiblings,
  prevElementSibling,
  getText,
  hasAttrib,
  removeSubsets,
  findAll,
  findOne,
} satisfies Options<Node, Element>['adapter'];
