import { BaseDriver } from '@appium/base-driver';
import type {
  DefaultCreateSessionResult,
  DriverData,
  W3CDriverCaps,
} from '@appium/types';
import type { capabilitiesConstraints as constrains } from '../CapabilitiesConstraints.ts';
import type { Driver } from '../Driver.ts';
import { SDK } from '../helpers/sdk.js';

export async function createSession(
  this: Driver,
  w3cCaps1: W3CDriverCaps<typeof constrains>,
  w3cCaps2?: W3CDriverCaps<typeof constrains>,
  w3cCaps3?: W3CDriverCaps<typeof constrains>,
  driverData?: DriverData[]
): Promise<DefaultCreateSessionResult<typeof constrains>> {
  const session = await BaseDriver.prototype.createSession.call(
    this,
    w3cCaps1,
    w3cCaps2,
    w3cCaps3,
    driverData
  );

  this.opts.context ??= 'ECP';
  this.opts.arguments ??= {};

  if (this.opts.entryPoint) {
    this.opts.arguments['odc_entry_point'] = this.opts.entryPoint;
  }

  if (!this.opts.noReset) {
    this.opts.arguments['odc_clear_registry'] = true;
  }

  if (this.opts.registry && Object.keys(this.opts.registry).length) {
    this.opts.arguments['odc_registry'] = this.opts.registry;
  }

  this.sdk = new SDK({
    ip: this.opts.ip,
    username: this.opts.username ?? 'rokudev',
    password: this.opts.password,
  });

  if (this.opts.app) {
    await this.installApp(this.opts.app);
    await this.activateApp('dev', this.opts.arguments);
  }

  return session;
}
