import { createHash } from 'crypto';
import { SDK } from '@dlenroc/roku';
import { promises as fs } from 'fs';
import { Driver } from '../../Driver';

export async function createSession(this: Driver, createSession?: any, jsonwpDesiredCapabilities?: Record<string, any>, jsonwpRequiredCaps?: Record<string, any>, w3cCapabilities?: Record<string, any>): Promise<[string, Record<string, any>]> {
  const session = await createSession(jsonwpDesiredCapabilities, jsonwpRequiredCaps, w3cCapabilities);

  const { ip, username, password, app: appPath } = this.caps;

  this.roku = new SDK(ip, username || 'rokudev', password);

  const apps = await this.roku.ecp.queryApps();
  let app = apps.find((app) => app.id === 'dev');
  let options: Record<string, any> = { odc_enable: true };

  if (this.opts.fastReset || this.opts.fullReset) {
    options.odc_clear_registry = true;
  }

  if (app) {
    const source = await fs.readFile(appPath);
    const md5 = createHash('md5').update(source).digest('hex');

    if (!this.opts.skipUninstall || !app.name.endsWith(`| ${md5}`)) {
      this.logger.info('Remove channel');
      await this.removeApp('dev');
      app = null;
    }
  }

  if (!app) {
    this.logger.info('Install channel');
    await this.installApp(appPath);
  }

  this.logger.info('Launch channel');
  await this.activateApp('dev', options);

  return session;
}
