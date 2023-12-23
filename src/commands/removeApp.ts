import { errors } from '@appium/base-driver';
import * as developerServer from '@dlenroc/roku-developer-server';
import type { Driver } from '../Driver.ts';

export async function removeApp(this: Driver, appId: string): Promise<boolean> {
  if (appId !== 'dev') {
    throw new errors.InvalidArgumentError('Only "dev" channel can be removed');
  }

  await developerServer.deleteChannel(this.sdk.developerServer);
  return true;
}
