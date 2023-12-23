import * as odc from '@dlenroc/roku-odc';
import type { Driver } from '../Driver.ts';

export async function pullFile(this: Driver, path: string): Promise<string> {
  const content = await odc.pullFile(this.sdk.odc, { path });
  return Buffer.from(content).toString('base64');
}
