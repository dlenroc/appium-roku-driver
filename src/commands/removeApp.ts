import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver';

export async function removeApp(this: Driver, appId: string): Promise<boolean> {
  if (appId !== 'dev') {
    throw new errors.InvalidArgumentError('Only "dev" channel can be removed');
  }

  await this.roku.developerServer.delete();
  return true;
}
