import { Driver } from '../Driver';

export async function reset(this: Driver): Promise<void> {
  const { app, arguments: args, entryPoint, registry } = this.opts;

  await this.installApp(app);
  await this.activateApp('dev', {
    odc_clear_registry: true,
    ...(entryPoint && { odc_entry_point: entryPoint }),
    ...(registry && { odc_registry: registry }),
    ...(args && args),
  });
}
