import { Driver } from '../Driver';

export async function pullFile(this: Driver, path: string): Promise<string> {
  const content = await this.roku.odc.pullFile(path);
  return content.toString('base64');
}
