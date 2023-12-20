import * as odc from '@dlenroc/roku-odc';
import type { Driver } from '../Driver.ts';

export async function pushFile(
  this: Driver,
  path: string,
  data: string
): Promise<void> {
  await odc.pushFile(this.sdk.odc, {
    path,
    content: Buffer.from(data, 'base64').buffer,
  });
}
