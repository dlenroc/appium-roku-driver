export function isTag(node: Node): node is Element {
  return node.nodeType === 1;
}
