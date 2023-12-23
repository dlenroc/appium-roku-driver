import * as ecp from '@dlenroc/roku-ecp';
import type { Driver } from '../Driver.ts';

export async function unlock(this: Driver): Promise<void> {
  const isLocked = await this.isLocked();

  if (!isLocked) {
    return;
  }

  await ecp.keypress(this.sdk.ecp, { key: 'Enter' });
  await this.waitForCondition({
    error: 'Screensaver is still visible',
    condition: async () => {
      const isLocked = await this.isLocked();
      return !isLocked;
    },
  });
}
