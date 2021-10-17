import { App } from '@dlenroc/roku';
import { createHash } from 'crypto';
import { Driver } from '../Driver';

export async function installApp(this: Driver, appPath: string, options?: unknown): Promise<void> {
  const source = await this.helpers.loadChannel(appPath);
  const apps = await this.roku.ecp.queryApps();
  let app: App | undefined = apps.find((app) => app.id === 'dev');

  if (app) {
    const md5 = createHash('md5').update(source).digest('hex');

    if (!this.opts.skipUninstall || !app.name.endsWith(`| ${md5}`)) {
      this.logger.info('Remove channel');
      await this.removeApp('dev');
      app = undefined;
    }
  }

  if (!app) {
    this.logger.info('Install channel');
    const patchedApp = await this.roku.odc.extend(source);
    await this.roku.developerServer.install(patchedApp);
  }
}
