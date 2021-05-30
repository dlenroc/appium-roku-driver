import { Driver } from '../../Driver';

export async function updateSettings(this: Driver, updateSettings: any, settings: Record<string, any>): Promise<void> {
  await updateSettings(settings);

  if (settings.hasOwnProperty('elementResponseAttributes')) {
    const elementResponseAttributes = settings.elementResponseAttributes;

    if (!elementResponseAttributes) {
      this.roku.document.fields = null;
      return;
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
}
