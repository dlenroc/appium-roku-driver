import type { Driver } from '../Driver';

export async function isLocked(this: Driver): Promise<boolean> {
  const activeApp = await this.roku.ecp.queryActiveApp();
  return !!activeApp.screensaver;
}
