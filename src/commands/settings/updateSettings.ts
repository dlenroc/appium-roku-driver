import { Driver } from '../../Driver';
import type { BaseDriver } from '@appium/base-driver'

export async function updateSettings(this: Driver, updateSettings: BaseDriver['updateSettings'], settings: Record<string, any>): ReturnType<BaseDriver['updateSettings']> {
  await updateSettings(settings);

  if (this.roku && settings.hasOwnProperty('elementResponseAttributes')) {
    const elementResponseAttributes = settings.elementResponseAttributes;

    if (!elementResponseAttributes) {
      this.roku.document.fields = undefined;
      return this.getSettings();
    }

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

  return this.getSettings();
}
