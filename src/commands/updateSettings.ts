import type { BaseDriver } from '@appium/base-driver';
import { Driver } from '../Driver';

export async function updateSettings(this: Driver, updateSettings: BaseDriver['updateSettings'], newSettings: Record<string, unknown>): Promise<void> {
  await updateSettings(newSettings);

  if (this.roku && newSettings.hasOwnProperty('elementResponseAttributes')) {
    this.roku.document.fields = undefined;

    const elementResponseAttributes = newSettings.elementResponseAttributes as string;

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
