import type { Driver } from '../Driver';

export async function closeApp(this: Driver): Promise<void> {
  await this.helpers.waitForCondition({
    error: 'Channel not closed',
    condition: async () => {
      await this.roku.ecp.keypress('Home');
      const activeApp = await this.roku.ecp.queryActiveApp();
      return activeApp.app === 'Roku';
    },
  });
}
