import * as developerServer from '@dlenroc/roku-developer-server';
import * as ecp from '@dlenroc/roku-ecp';
import * as odc from '@dlenroc/roku-odc';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import type { Driver } from '../Driver.ts';
import * as appiumUtils from '../helpers/appium.js';

export async function installApp(this: Driver, appPath: string): Promise<void> {
  const [path, app] = await Promise.all([
    this.helpers.configureApp(appPath, {
      supportedExtensions: ['.zip'],
      onPostProcess: () => undefined,
    }),
    ecp
      .queryApps(this.sdk.ecp)
      .then((apps) => apps.find((app) => app.id === 'dev')),
  ]);

  const source = await readFile(path);

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

  await appiumUtils.retrying({
    timeout: 1e4,
    validate: (state) => state === 4,
    command: () => this.queryAppState('dev'),
  });

  await this.performActions([
    {
      id: 'remote',
      type: 'key',
      actions: [
        { type: 'keyDown', value: 'Home' },
        { type: 'keyUp', value: 'Home' },
      ],
    },
  ]);
}
