import { errors } from '@appium/base-driver';
import type { AppId } from '@dlenroc/roku-ecp';
import { URL } from 'node:url';
import type { Driver } from '../Driver.ts';

export async function setUrl(this: Driver, url: string): Promise<void> {
  const { host, pathname, searchParams } = new URL(url);
  const app = pathname.slice(1) as AppId;

  let params: Record<string, string> = {};
  for (const [key, value] of searchParams) {
    params[key] = value;
  }

  switch (host) {
    case 'launch':
      return await this.sdk.ecp.launch({ appId: app, params });
    case 'input':
      return await this.sdk.ecp.input(params);
    default:
      throw new errors.InvalidArgumentError('Unsupported URL format');
  }
}
