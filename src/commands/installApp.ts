import type { App } from '@dlenroc/roku';
import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import type { Driver } from '../Driver';

export async function installApp(this: Driver, appPath: string, options?: unknown): Promise<void> {
  // @ts-ignore because is available since @appium/base-driver@8.2.2 but misses in type definition
  appPath = await this.helpers.configureApp(appPath, { supportedExtensions: ['zip'], onPostProcess: () => {} });

  const source = await readFile(appPath);
  const apps = await this.roku.ecp.queryApps();
  let app: App | undefined = apps.find((app) => app.id === 'dev');

  if (app) {
    const md5 = createHash('md5').update(source).digest('hex');
    const alreadyInstalled = app.name.endsWith(`| ${md5}`);

    if (alreadyInstalled) {
      this.logger.info('Channel is already installed');
      return;
    }
  }

  this.logger.info('Install channel');
  const patchedApp = await this.roku.odc.extend(source);
  await this.roku.developerServer.install(patchedApp);
}
