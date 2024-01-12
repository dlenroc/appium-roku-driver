import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver.ts';

export async function setContext(this: Driver, name: string): Promise<void> {
  const contexts = await this.getContexts();

  if (!contexts.includes(name)) {
    throw new errors.NoSuchContextError(
      `There is no "${name}" context in [${contexts.join(', ')}]`
    );
  }

  this.opts.context = name as any;
}
