import { Driver } from '../../Driver';

export async function setContext(this: Driver, context: string): Promise<void> {
  // appium-desktop requires NATIVE_APP context
  if (context === 'NATIVE_APP') {
    return this.setContext('ECP');
  }

  const contexts = await this.getContexts();

  if (!contexts.includes(context)) {
    return this.logger.errorAndThrow(new this.errors.NoSuchContextError(`There is no "${context}" context in [${contexts.join(', ')}]`));
  }

  this.roku.document.context = context as any;
}
