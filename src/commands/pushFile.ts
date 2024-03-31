import type { Driver } from '../Driver.ts';

export async function pushFile(
  this: Driver,
  path: string,
  data: string
): Promise<void> {
  await this.sdk.odc.pushFile({
    path,
    content: Buffer.from(data, 'base64').buffer,
  });
}
