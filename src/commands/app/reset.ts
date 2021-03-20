import { Driver } from '../../Driver';

export async function reset(this: Driver): Promise<void> {
  await this.closeApp();
  await this.roku.debugServer.clearLaunchCache();
  await this.roku.debugServer.generateDeveloperKey();
  await this.launchApp();
}
