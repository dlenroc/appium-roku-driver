import * as ecp from '@dlenroc/roku-ecp';
import type { Driver } from '../Driver.ts';

export async function closeApp(this: Driver): Promise<void> {
  await this.waitForCondition({
    error: 'Channel not closed',
    condition: async () => {
      await ecp.keypress(this.sdk.ecp, { key: 'Home' });
      const activeApp = await ecp.queryActiveApp(this.sdk.ecp);
      return !('id' in activeApp.app);
    },
  });
}
