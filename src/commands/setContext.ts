import { Driver } from '../Driver';

export async function setContext(this: Driver, name: string): Promise<void> {
  // appium-desktop requires NATIVE_APP context
  if (name === 'NATIVE_APP') {
    return this.setContext('ECP');
  }

  const contexts = await this.getContexts();

  if (!contexts.includes(name)) {
    throw new this.errors.NoSuchContextError(`There is no "${name}" context in [${contexts.join(', ')}]`);
  }

  this.roku.document.context = name as any;
}
