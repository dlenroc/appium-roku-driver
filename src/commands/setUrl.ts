import { errors } from '@appium/base-driver';
import { URL } from 'node:url';
import type { Driver } from '../Driver.ts';

export async function setUrl(this: Driver, url: string): Promise<void> {
  const { host, pathname, searchParams } = new URL(url);
  const app = pathname.slice(1);
  const params = Object.fromEntries(searchParams);

  switch (host) {
    case 'launch':
      return this.activateApp(app, params);
    case 'input':
      return this.sdk.ecp.input(params);
    default:
      throw new errors.InvalidArgumentError('Unsupported URL format');
  }
}
