export function contains(current: Element, other: Element): boolean {
  for (let node: Node | null = other; node; node = node.parentNode) {
    if (node === current) {
      return true;
    }
  }

  return false;
}
