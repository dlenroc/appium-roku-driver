import type { Driver } from '../Driver';

export async function getScreenshot(this: Driver): Promise<string> {
  const image = await this.roku.developerServer.getScreenshot();
  return image.toString('base64');
}
