import type { Driver } from '../Driver.ts';

export async function launchApp(this: Driver): Promise<void> {
  await this.activateApp('dev');
}
