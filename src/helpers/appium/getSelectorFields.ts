import { getSelector } from './getSelector.js';

export function getSelectorFields(
  strategy: string,
  selector: string
): string[] | undefined {
  [strategy, selector] = getSelector(strategy, selector);

  let fields = new Set<string>();

  switch (strategy) {
    case 'css selector':
      if (selector.includes('#')) {
        fields.add('id');
      }

      for (const [, field] of selector.matchAll(/\[\s*([\w*.-]+)\s*\W?=/g)) {
        fields.add(field!);
      }
      break;
    case 'xpath':
      for (const [, field] of selector.matchAll(/@([\w*.-]+)/g)) {
        if (field === '*') return undefined;
        fields.add(field!);
      }
      break;
    default:
      throw Error(`${strategy} is not a supported selector`);
  }

  if (fields.has('id')) {
    fields.add('uiElementId');
    fields.add('name');
  }

  return [...fields];
}
