import type { Driver } from '../Driver';

export async function removeApp(this: Driver, appId: string, options?: unknown): Promise<void> {
  if (appId !== 'dev') {
    return this.logger.errorAndThrow('Only "dev" channel can be removed');
  }

  await this.roku.developerServer.delete();
}
