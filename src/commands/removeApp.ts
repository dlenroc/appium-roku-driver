import type { Driver } from '../Driver.ts';

export async function removeApp(this: Driver, appId: string): Promise<boolean> {
  const isInstalled = await this.isAppInstalled(appId);

  if (isInstalled) {
    if (appId === 'dev') {
      await this.sdk.developerServer.deleteChannel();
    } else {
      const id = appId as any;
      await this.sdk.debugServer.removePlugin({ id });
    }
  }

  return true;
}
