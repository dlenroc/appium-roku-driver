import { Driver } from '../../Driver';

export async function reset(this: Driver): Promise<void> {
  await this.activateApp('dev', { odc_clear_registry: true });
}
