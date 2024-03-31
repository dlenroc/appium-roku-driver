import { errors } from '@appium/base-driver';
import * as ecp from '@dlenroc/roku-ecp';
import type { Driver } from '../Driver.ts';

export async function activateApp(
  this: Driver,
  appId: string,
  options?: unknown
): Promise<void> {
  options ??= { odc_clear_registry: false };

  if (typeof options !== 'object' || Array.isArray(options)) {
    throw new errors.InvalidArgumentError('Launch arguments must be an object');
  }

  await this.sdk.ecp.launch({
    appId: appId as ecp.AppId,
    params: options as Record<string, unknown>,
  });
}
