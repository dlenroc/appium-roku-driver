import { AppId } from '@dlenroc/roku';
import { Driver } from '../../Driver';

export async function activateApp(this: Driver, id: string): Promise<void> {
  await this.roku.ecp.launch(id as AppId);
  await this.waitForCondition({
    error: 'Channel not started',
    condition: async () => {
      const activeApp = await this.roku.ecp.queryActiveApp();
      return activeApp.app['id'] == id;
    },
  });
}
