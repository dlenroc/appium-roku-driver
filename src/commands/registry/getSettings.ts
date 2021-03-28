import { Driver } from '../../Driver';

export async function getSettings(this: Driver): Promise<Record<string, null | Record<string, null | string>>> {
  const state = await this.queryAppState('dev');

  if (state !== 4) {
    return this.logger.errorAndThrow('Registers can only be retrieved when the "dev" channel is in the foreground');
  }

  return await this.roku.odc.getRegistry();
}
