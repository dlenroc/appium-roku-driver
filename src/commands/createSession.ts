import { BaseDriver } from '@appium/base-driver';
import type {
  DefaultCreateSessionResult,
  DriverData,
  W3CDriverCaps,
} from '@appium/types';
import { DebugServerExecutor } from '@dlenroc/roku-debug-server';
import { DeveloperServerExecutor } from '@dlenroc/roku-developer-server';
import { ECPExecutor } from '@dlenroc/roku-ecp';
import { ODCExecutor } from '@dlenroc/roku-odc';
import type { capabilitiesConstraints as constrains } from '../CapabilitiesConstraints.ts';
import type { Driver } from '../Driver.ts';

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

  this.controller = new AbortController();
  this.opts.context ??= 'ECP';
  this.sdk = {
    debugServer: new DebugServerExecutor({
      signal: this.controller.signal,
      hostname: this.opts.ip,
      port: 8085,
    }),
    developerServer: new DeveloperServerExecutor({
      signal: this.controller.signal,
      address: `http://${this.opts.ip}`,
      username: this.opts.username ?? 'rokudev',
      password: this.opts.password,
    }),
    ecp: new ECPExecutor({
      signal: this.controller.signal,
      address: `http://${this.opts.ip}:8060`,
    }),
    odc: new ODCExecutor({
      signal: this.controller.signal,
      address: `http://${this.opts.ip}:8061`,
    }),
  };

  if (this.opts.app) {
    await this.installApp(this.opts.app);
    await this.activateApp('dev', {
      odc_clear_registry: !this.opts.noReset,
      ...(this.opts.entryPoint && { odc_entry_point: this.opts.entryPoint }),
      ...(this.opts.registry && { odc_registry: this.opts.registry }),
      ...this.opts.arguments,
    });
  }

  return session;
}
