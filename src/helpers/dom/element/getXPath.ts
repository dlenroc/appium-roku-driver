export function getXPath(node: Node): string {
  let nodeElem: Node | null = node;
  let parts: string[] = [];
  while (nodeElem && nodeElem.nodeType === 1) {
    let nbOfPreviousSiblings = 0;
    let hasNextSiblings = false;
    let sibling = nodeElem.previousSibling;
    while (sibling) {
      if (sibling.nodeType !== 10 && sibling.nodeName === nodeElem.nodeName) {
        nbOfPreviousSiblings++;
      }
      sibling = sibling.previousSibling;
    }
    sibling = nodeElem.nextSibling;
    while (sibling) {
      if (sibling.nodeName === nodeElem.nodeName) {
        hasNextSiblings = true;
        break;
      }
      sibling = sibling.nextSibling;
    }
    let nth =
      nbOfPreviousSiblings || hasNextSiblings
        ? '[' + (nbOfPreviousSiblings + 1) + ']'
        : '';
    parts.push(nodeElem.nodeName + nth);
    nodeElem = nodeElem.parentNode;
  }
  return parts.length ? '/' + parts.reverse().join('/') : '';
}
