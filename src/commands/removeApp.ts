import * as debugServer from '@dlenroc/roku-debug-server';
import * as developerServer from '@dlenroc/roku-developer-server';
import type { Driver } from '../Driver.ts';

export async function removeApp(this: Driver, appId: string): Promise<boolean> {
  const isInstalled = await this.isAppInstalled(appId);

  if (isInstalled) {
    if (appId === 'dev') {
      await developerServer.deleteChannel(this.sdk.developerServer);
    } else {
      const id = appId as any;
      await debugServer.removePlugin(this.sdk.debugServer, { id });
    }
  }

  return true;
}
