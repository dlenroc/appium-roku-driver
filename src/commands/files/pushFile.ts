import { Driver } from '../../Driver';

export async function pushFile(this: Driver, path: string, content: string): Promise<void> {
  await this.roku.odc.pushFile(path, Buffer.from(content, 'base64'));
}
