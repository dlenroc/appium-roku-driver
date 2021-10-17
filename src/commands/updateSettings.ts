import { Driver } from '../Driver';
import type { BaseDriver, DeviceSettings } from '@appium/base-driver';

export async function updateSettings(this: Driver, updateSettings: BaseDriver['updateSettings'], newSettings: Record<string, unknown>): Promise<DeviceSettings> {
  await updateSettings(newSettings);

  if (this.roku && newSettings.hasOwnProperty('elementResponseAttributes')) {
    const elementResponseAttributes = newSettings.elementResponseAttributes as string;

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
