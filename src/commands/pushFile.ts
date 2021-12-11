import type { Driver } from '../Driver';

export async function pushFile(this: Driver, path: string, data: string): Promise<void> {
  await this.roku.odc.pushFile(path, Buffer.from(data, 'base64'));
}
