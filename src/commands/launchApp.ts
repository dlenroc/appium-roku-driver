import { Driver } from '../Driver';

export async function launchApp(this: Driver): Promise<void> {
  await this.activateApp('dev');
}
