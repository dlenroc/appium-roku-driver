import { errors } from '@appium/base-driver';
import type { Driver } from '../../Driver.js';

export async function updateSetting(
  this: Driver,
  prop: unknown,
  newValue: unknown
): Promise<void> {
  if (prop === 'elementResponseAttributes') {
    if (typeof newValue !== 'string') {
      throw new errors.InvalidArgumentError(
        `The value of "elementResponseAttributes" must be a string.`
      );
    }

    if (newValue) {
      const fields: Record<string, string[]> = {};
      const attributes = newValue.split(',');

      for (let attribute of attributes) {
        let tag = '*';

        if (attribute.includes('/')) {
          const parts = attribute.split('/');
          tag = parts[0]!;
          attribute = parts[1]!;
        }

        if (!fields[tag]) {
          fields[tag] = [];
        }

        fields[tag]!.push(attribute);
      }

      this.fields = fields;
    } else {
      this.fields = undefined;
    }
  }
}
