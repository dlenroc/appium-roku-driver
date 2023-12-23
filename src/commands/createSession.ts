import { BaseDriver } from '@appium/base-driver';
import type {
  DefaultCreateSessionResult,
  DriverData,
  W3CDriverCaps,
} from '@appium/types';
import { SDK } from '@dlenroc/roku';
import { DeveloperServerExecutor } from '@dlenroc/roku-developer-server';
import { ECPExecutor } from '@dlenroc/roku-ecp';
import { ODCExecutor } from '@dlenroc/roku-odc';
import { Document } from 'roku-dom';
import type { capabilitiesConstraints as constrains } from '../CapabilitiesConstraints.js';
import type { Driver } from '../Driver.ts';

export async function createSession(
  this: Driver,
  jwpCaps: W3CDriverCaps<typeof constrains>,
  jwpReqCaps: W3CDriverCaps<typeof constrains>,
  w3cCaps: W3CDriverCaps<typeof constrains>,
  driverData?: DriverData[]
): Promise<DefaultCreateSessionResult<typeof constrains>> {
  const session = BaseDriver.prototype.createSession.call(
    this,
    jwpCaps,
    jwpReqCaps,
    w3cCaps,
    driverData
  );
  const {
    app,
    arguments: args,
    context,
    entryPoint,
    ip,
    noReset,
    password,
    registry,
    username,
  } = this.opts;

  this.abortController = new AbortController();

  this.sdk = {
    developerServer: new DeveloperServerExecutor({
      signal: this.abortController.signal,
      address: `http://${ip}`,
      username: username || 'rokudev',
      password,
    }),
    ecp: new ECPExecutor({
      signal: this.abortController.signal,
      address: `http://${ip}:8060`,
    }),
    odc: new ODCExecutor({
      signal: this.abortController.signal,
      address: `http://${ip}:8061`,
    }),
  };

  this.document = new Document(this.sdk);
  this.document.context = context || 'ECP';

  this.roku = new SDK(ip, username || 'rokudev', password);
  this.roku.document = this.document as any;

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
