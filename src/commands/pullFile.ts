import type { Driver } from '../Driver.ts';

export async function pullFile(this: Driver, path: string): Promise<string> {
  const content = await this.sdk.odc.pullFile({ path });
  return Buffer.from(content).toString('base64');
}
