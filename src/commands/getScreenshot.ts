import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver.ts';

export async function getScreenshot(this: Driver): Promise<string> {
  const path = await this.sdk.developerServer.takeScreenshot();
  if (!path) {
    throw new errors.UnknownError(
      'A screenshot was not taken; ' +
        'it is possible that you are trying to take ' +
        'a screenshot of a non-owned channel.'
    );
  }

  const response = await this.sdk.developerServer.executor.execute(path);
  if (!response.ok) {
    throw new errors.UnknownError(
      'Screenshot was taken, but could not be retrieved from the device.'
    );
  }

  const screenshot = await response.arrayBuffer();
  return Buffer.from(screenshot).toString('base64');
}
