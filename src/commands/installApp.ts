import type { App } from '@dlenroc/roku';
import * as developerServer from '@dlenroc/roku-developer-server';
import * as ecp from '@dlenroc/roku-ecp';
import * as odc from '@dlenroc/roku-odc';
import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import type { Driver } from '../Driver.ts';

export async function installApp(this: Driver, appPath: string): Promise<void> {
  appPath = await this.helpers.configureApp(appPath, {
    supportedExtensions: ['.zip'],
    onPostProcess: () => null,
  });

  const source = await readFile(appPath);
  const apps = await ecp.queryApps(this.sdk.ecp);
  let app: App | undefined = apps.find((app) => app.id === 'dev');

  if (app) {
    const md5 = createHash('md5').update(source).digest('hex');
    const alreadyInstalled = app.name.endsWith(`| ${md5}`);

    if (alreadyInstalled) {
      this.log.info('Channel is already installed');
      return;
    }
  }

  this.log.info('Install channel');
  const patchedApp = await odc.inject(source.buffer);
  await developerServer.installChannel(this.sdk.developerServer, {
    content: new Uint8Array(patchedApp),
  });

  await this.waitForCondition({
    error: 'Channel not started',
    condition: async () => {
      const state = await this.queryAppState('dev');
      return state === 4;
    },
  });

  await this.terminateApp('dev');
}
