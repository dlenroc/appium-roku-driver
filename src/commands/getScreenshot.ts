import * as developerServer from '@dlenroc/roku-developer-server';
import type { Driver } from '../Driver.ts';

export async function getScreenshot(this: Driver): Promise<string> {
  const path = await developerServer.takeScreenshot(this.sdk.developerServer);
  const response = await this.sdk.developerServer.execute(path);
  // TODO check status
  return Buffer.from(await response.arrayBuffer()).toString('base64');
}
