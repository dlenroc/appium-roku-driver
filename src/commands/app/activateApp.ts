import { AppId } from '@dlenroc/roku';
import { Driver } from '../../Driver';

export async function activateApp(this: Driver, id: string, options?: Record<string, any>): Promise<void> {
  await this.roku.ecp.launch(id as AppId, options);
  await this.waitForCondition({
    error: 'Channel not started',
    condition: async () => {
      const activeApp = await this.roku.ecp.queryActiveApp();
      return typeof activeApp.app !== 'string' && activeApp.app.id == id;
    },
  });
}
