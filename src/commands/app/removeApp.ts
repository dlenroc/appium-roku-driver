import { Driver } from '../../Driver';

export async function removeApp(this: Driver, id: string): Promise<void> {
  if (id !== 'dev') {
    return this.logger.errorAndThrow('Only "dev" channel can be removed');
  }

  await this.roku.developerServer.delete();
}
