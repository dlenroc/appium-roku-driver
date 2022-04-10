import type { Driver } from '../Driver';

export async function updateSetting(this: Driver, prop: string, newValue: unknown, curValue: unknown): Promise<void> {
  if (this.roku && prop === 'elementResponseAttributes') {
    this.roku.document.fields = undefined;

    const elementResponseAttributes = newValue as string;

    if (elementResponseAttributes) {
      const fields: Record<string, string[]> = {};
      const attributes = elementResponseAttributes.split(',');

      for (let attribute of attributes) {
        let tag = '*';

        if (attribute.includes('/')) {
          [tag, attribute] = attribute.split('/');
        }

        if (!fields[tag]) {
          fields[tag] = [];
        }

        fields[tag].push(attribute);
      }

      this.roku.document.fields = fields;
    }
  }
}
