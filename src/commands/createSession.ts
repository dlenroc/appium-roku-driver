import { BaseDriver } from '@appium/base-driver';
import { SDK } from '@dlenroc/roku';
import { Driver } from '../Driver';

export async function createSession(this: Driver, createSession: BaseDriver['createSession'], jwpCaps: {}, jwpReqCaps: {}, w3cCaps: {}): Promise<[string, {}]> {
  const session = await createSession(jwpCaps, jwpReqCaps, w3cCaps);

  const { app, arguments: args, context, entryPoint, ip, noReset, password, registry, username } = this.opts;

  this.roku = new SDK(ip, username || 'rokudev', password);
  this.roku.document.context = context || 'ECP';

  await this.updateSettings(this.settings.getSettings());
  await this.installApp(app);
  await this.activateApp('dev', {
    odc_clear_registry: !noReset,
    ...(entryPoint && { odc_entry_point: entryPoint }),
    ...(registry && { odc_registry: registry }),
    ...(args && args),
  });

  return session;
}
