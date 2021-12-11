import type { AppId } from '@dlenroc/roku';
import { URL } from 'url';
import type { Driver } from '../Driver';

export async function setUrl(this: Driver, url: string): Promise<void> {
  const { host, pathname, searchParams } = new URL(url);
  const app = pathname.slice(1) as AppId;

  let params: Record<string, string> = {};
  for (const [key, value] of searchParams) {
    params[key] = value;
  }

  switch (host) {
    case 'launch':
      return await this.roku.ecp.launch(app, params);
    case 'input':
      return await this.roku.ecp.input(params);
    default:
      this.logger.errorAndThrow('Unsupported URL format');
  }
}
