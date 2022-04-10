import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver';

export async function updateSetting(this: Driver, prop: string, newValue: unknown, curValue: unknown): Promise<void> {
  if (prop === 'elementResponseAttributes') {
    if (typeof newValue !== 'string') {
      throw new errors.InvalidArgumentError(`The value of "elementResponseAttributes" must be a string.`);
    }

    if (newValue) {
      const fields: Record<string, string[]> = {};
      const attributes = newValue.split(',');

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
    } else {
      this.roku.document.fields = undefined;
    }
  }
}
