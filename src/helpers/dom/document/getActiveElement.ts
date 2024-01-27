import { isTag } from '../element/isTag.js';

export function getActiveElement(document: Document): Element {
  let focusedNode = findFocusedNode(document.childNodes);
  if (focusedNode) {
    focusedNode = handleContentNodeFocus(focusedNode) ?? focusedNode;
  }

  return focusedNode || document.documentElement;
}

function findFocusedNode(nodes: NodeListOf<Node>): Element | null {
  const notFocusedNodes = [];

  for (let i = 0, n = nodes.length; i < n; i++) {
    const node = nodes[i]!;
    if (!isTag(node)) {
      continue;
    }

    const isVisible = node.getAttribute('visible');
    if (isVisible === 'false') {
      continue;
    }

    const isFocused = node.getAttribute('focused');
    if (isFocused !== 'true') {
      notFocusedNodes.push(node);
      continue;
    }

    const focusItem = node.getAttribute('focusItem');
    if (focusItem) {
      return handleFocusItem(node, focusItem) ?? node;
    }

    return findFocusedNode(node.childNodes) ?? node;
  }

  for (const node of notFocusedNodes) {
    const focusedNode = findFocusedNode(node.childNodes);
    if (focusedNode) {
      return focusedNode;
    }
  }

  return null;
}

function handleFocusItem(node: Element, focusItem: string): Element | null {
  const index = +focusItem;
  if (isNaN(index)) {
    return null;
  }

  for (let i = 0, children = node.childNodes, n = children.length; i < n; i++) {
    const node = children[i]!;
    if (!isTag(node)) {
      continue;
    }

    const nodeIndex = node.getAttribute('index');
    if (nodeIndex === focusItem) {
      return findFocusedNode(node.childNodes) ?? node;
    }
  }

  return null;
}

function handleContentNodeFocus(node: Element): Element | null {
  const focusedItem = +(node.getAttribute('itemFocused') ?? '');
  const focusedColumn = +(
    node
      .getAttribute('rowItemFocused') //
      ?.match(/\[\d+,(\d+)\]/)?.[1] ?? ''
  );

  if (!isNaN(focusedItem)) {
    let contentNode = Array.from(node.childNodes).filter(isTag)[0];
    if (contentNode?.tagName?.toUpperCase() === 'CONTENTNODE') {
      node =
        Array.from(contentNode.childNodes).filter(isTag)[focusedItem] ?? node;

      if (
        !isNaN(focusedColumn) &&
        node?.tagName?.toUpperCase() === 'CONTENTNODE'
      ) {
        node = Array.from(node.childNodes).filter(isTag)[focusedColumn] ?? node;
      }
    }
  }

  return null;
}
