import type { ExternalDriver, W3CCapabilities } from '@appium/types';
import { SDK } from '@dlenroc/roku';
import type { Driver } from '../Driver';

export async function createSession(this: Driver, createSession: ExternalDriver['createSession'], jwpCaps: W3CCapabilities, jwpReqCaps: W3CCapabilities, w3cCaps: W3CCapabilities): Promise<[string, {}]> {
  const session = await createSession(jwpCaps, jwpReqCaps, w3cCaps);

  const { app, arguments: args, context, entryPoint, ip, noReset, password, registry, username } = this.opts;

  this.roku = new SDK(ip, username || 'rokudev', password);
  this.roku.document.context = context || 'ECP';

  await this.installApp(app);
  await this.activateApp('dev', {
    odc_clear_registry: !noReset,
    ...(entryPoint && { odc_entry_point: entryPoint }),
    ...(registry && { odc_registry: registry }),
    ...(args && args),
  });

  return session;
}
