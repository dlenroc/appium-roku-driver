import { longSleep } from 'asyncbox';
import { Driver } from '../../Driver';

export async function background(this: Driver, seconds?: number): Promise<void> {
  const activeApp = await this.roku.ecp.queryActiveApp();
  const app = activeApp.app;

  if (typeof app === 'string') {
    return this.logger.errorAndThrow('Channel is not running');
  }

  await this.closeApp();

  if (seconds === null || seconds === -1) {
    return;
  }

  await longSleep(seconds * 1000);
  await this.activateApp(String(app.id));
}
