import type { AppId, Params } from '@dlenroc/roku';
import type { Driver } from '../Driver';

export async function activateApp(this: Driver, appId: string, options?: unknown): Promise<void> {
  await this.roku.ecp.launch(appId as AppId, options as Params);
  await this.waitForCondition({
    error: 'Channel not started',
    condition: async () => {
      const activeApp = await this.roku.ecp.queryActiveApp();
      return typeof activeApp.app !== 'string' && activeApp.app.id == appId;
    },
  });
}
