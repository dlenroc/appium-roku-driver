import { Driver } from '../../Driver';

export async function setValueImmediate(this: Driver, text: string, elementId: string): Promise<void> {
  await this.replaceValue(text, elementId);
}
