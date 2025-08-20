import { isDisplayed } from './isDisplayed.js';
import { isTag } from './isTag.js';

export function getText(element: Element): string {
  if (!isDisplayed(element)) {
    return '';
  }

  const textChunks: string[] = [];
  const nodeStack: (Node[] | NodeListOf<Node>)[] = [[element]];
  const indexStack = [0];

  loop: while (nodeStack.length) {
    const nodes = nodeStack[nodeStack.length - 1]!;
    const index = indexStack[indexStack.length - 1]!;

    if (index >= nodes.length) {
      nodeStack.pop();
      indexStack.pop();
      continue;
    }

    const node = nodes[index]!;
    indexStack[indexStack.length - 1]!++;

    if (
      !isTag(node) ||
      node.getAttribute('visible') === 'false' ||
      node.getAttribute('opacity') === '0'
    ) {
      continue;
    }

    for (let i = 0, n = node.childNodes.length; i < n; i++) {
      if (isTag(node.childNodes[i]!)) {
        nodeStack.push(node.childNodes);
        indexStack.push(0);
        continue loop;
      }
    }

    const tagName = node.tagName.toLowerCase();
    if (tagName.endsWith('label') || tagName.endsWith('button')) {
      textChunks.push(node.getAttribute('text') ?? '');
    }
  }

  return textChunks.join('\n');
}
