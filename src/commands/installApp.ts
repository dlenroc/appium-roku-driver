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
    this.sdk.ecp
      .queryApps()
      .then((apps) => apps.find((app) => app.id === 'dev')),
  ]);

  const source = await readFile(path);

  if (app) {
    const md5 = createHash('md5').update(source).digest('hex');
    const alreadyInstalled = app.name.endsWith(`| ${md5}`);

    if (alreadyInstalled) {
      this.log.info('Channel is already installed');
      await this.terminateApp('dev');
      return;
    }
  }

  this.log.info('Install channel');
  const content = new Uint8Array(await odc.inject(source.buffer as ArrayBuffer));
  await this.sdk.developerServer.installChannel({ content });

  await appiumUtils.retrying({
    timeout: 1e4,
    validate: (state) => state === 4,
    command: () => this.queryAppState('dev'),
  });
}
