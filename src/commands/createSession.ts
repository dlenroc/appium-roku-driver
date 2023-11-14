import { BaseDriver } from '@appium/base-driver';
import type { DefaultCreateSessionResult, DriverData, W3CDriverCaps } from '@appium/types';
import { SDK } from '@dlenroc/roku';
import type { capabilitiesConstraints as constrains } from '../CapabilitiesConstraints';
import type { Driver } from '../Driver';

export async function createSession(
  this: Driver,
  jwpCaps: W3CDriverCaps<typeof constrains>,
  jwpReqCaps: W3CDriverCaps<typeof constrains>,
  w3cCaps: W3CDriverCaps<typeof constrains>,
  driverData?: DriverData[]
): Promise<DefaultCreateSessionResult<typeof constrains>> {
  const session = BaseDriver.prototype.createSession.call(this, jwpCaps, jwpReqCaps, w3cCaps, driverData);
  const { app, arguments: args, context, entryPoint, ip, noReset, password, registry, username } = this.opts;

  this.roku = new SDK(ip, username || 'rokudev', password);
  this.roku.document.context = context || 'ECP';

  if (app) {
    await this.installApp(app);
    await this.activateApp('dev', {
      odc_clear_registry: !noReset,
      ...(entryPoint && { odc_entry_point: entryPoint }),
      ...(registry && { odc_registry: registry }),
      ...(args && args),
    });
  }

  return session;
}
