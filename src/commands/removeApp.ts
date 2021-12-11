import type { Driver } from '../Driver';
import { errors } from '@appium/base-driver';

export async function removeApp(this: Driver, appId: string, options?: unknown): Promise<void> {
  if (appId !== 'dev') {
    throw new errors.InvalidArgumentError('Only "dev" channel can be removed');
  }

  await this.roku.developerServer.delete();
}
