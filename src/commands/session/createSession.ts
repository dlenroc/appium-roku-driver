import { SDK } from '@dlenroc/roku';
import cacache, { CacheObject } from 'cacache';
import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import fetch from 'make-fetch-happen';
import { resolve } from 'path';
import { Driver } from '../../Driver';

const CACHED_APPS_MAX_AGE = 1000 * 60 * 60 * 24; // ms

export async function createSession(this: Driver, createSession?: any, jsonwpDesiredCapabilities?: Record<string, any>, jsonwpRequiredCaps?: Record<string, any>, w3cCapabilities?: Record<string, any>): Promise<[string, Record<string, any>]> {
  const session = await createSession(jsonwpDesiredCapabilities, jsonwpRequiredCaps, w3cCapabilities);

  const { ip, username, password, app: appPath, context, registry, entryPoint, arguments: args } = this.caps;

  this.roku = new SDK(ip, username || 'rokudev', password);
  this.roku.document.context = (context as 'ECP' | 'ODC') || this.roku.document.context;
  await this.updateSettings(await this.getSettings());

  const apps = await this.roku.ecp.queryApps();
  let app = apps.find((app) => app.id === 'dev');
  let options: Record<string, any> = { odc_enable: true };

  if (registry) {
    options.odc_registry = registry;
  }

  if (entryPoint) {
    options.odc_entry_point = entryPoint;
  }

  if (this.opts.fastReset || this.opts.fullReset) {
    options.odc_clear_registry = true;
  }

  let source: Buffer;
  if (/^https?:\/\//.test(appPath)) {
    const timestamp = Date.now();
    const cachePath = resolve(this.opts.tmpDir, 'appium-roku-driver');
    const response = await fetch(appPath, { cachePath });
    if (!response.ok) {
      throw new this.errors.SessionNotCreatedError(`Failed to download "${appPath}" -> ${response.status} ${response.statusText}`);
    }

    source = await response.buffer();

    // @ts-ignore
    await cacache.verify(cachePath, { filter: (entry: CacheObject) => timestamp < entry.time + CACHED_APPS_MAX_AGE });
  } else {
    source = await fs.readFile(appPath);
  }

  if (app) {
    const md5 = createHash('md5').update(source).digest('hex');

    if (!this.opts.skipUninstall || !app.name.endsWith(`| ${md5}`)) {
      this.logger.info('Remove channel');
      await this.removeApp('dev');
      app = null;
    }
  }

  if (!app) {
    this.logger.info('Install channel');
    const patchedApp = await this.roku.odc.extend(source);
    await this.roku.developerServer.install(patchedApp);
  }

  this.logger.info('Launch channel');
  await this.activateApp('dev', Object.assign(options, args || {}));

  return session;
}
