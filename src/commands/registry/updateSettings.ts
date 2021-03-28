import { Driver } from '../../Driver';

export async function updateSettings(this: Driver, settings: Record<string, null | Record<string, null | string>>): Promise<void> {
  const state = await this.queryAppState('dev');

  if (state !== 4) {
    return this.logger.errorAndThrow('Registers can only be updated when the "dev" channel is in the foreground');
  }

  await this.roku.odc.patchRegistry(settings);
}
