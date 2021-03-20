import { SDK } from '@dlenroc/roku';
import { promises as fs } from 'fs';
import JSZip from 'jszip';
import { Driver } from '../../Driver';

export async function createSession(this: Driver, createSession?: any, jsonwpDesiredCapabilities?: Record<string, any>, jsonwpRequiredCaps?: Record<string, any>, w3cCapabilities?: Record<string, any>): Promise<[string, Record<string, any>]> {
  const session = await createSession(jsonwpDesiredCapabilities, jsonwpRequiredCaps, w3cCapabilities);

  const { ip, username, password, app: appPath } = this.caps;

  this.roku = new SDK(ip, username || 'rokudev', password);

  const apps = await this.roku.ecp.queryApps();
  let app = apps.find((app) => app.id === 'dev');

  if (this.opts.fastReset || this.opts.fullReset) {
    this.logger.info('Clear channel registry/cache');

    if (app) {
      await this.closeApp();
    }

    await this.roku.debugServer.clearLaunchCache();
    await this.roku.debugServer.generateDeveloperKey();
  }

  if (app) {
    const zip = await JSZip.loadAsync(await fs.readFile(appPath));
    const manifest = await zip.file('manifest').async('string');
    const title = manifest.match(/^title\s*=(.+)/m)?.[1]?.trim();
    const major = +manifest.match(/^major_version\s*=(.+)/m)?.[1]?.trim();
    const minor = +manifest.match(/^minor_version\s*=(.+)/m)?.[1]?.trim();
    const build = +manifest.match(/^build_version\s*=(.+)/m)?.[1]?.trim();
    const version = `${major}.${minor}.${build}`;
    const isAlreadyInstalled = app.name === title && app.version === version;

    this.logger.info(`Candidate: ${title} (${version})`);
    this.logger.info(`Actual: ${app.name} (${app.version})`);

    if (!isAlreadyInstalled) {
      app = null;
    } else {
      if (!this.opts.skipUninstall) {
        this.logger.info('Remove channel');

        app = null;
        await this.removeApp('dev');
      }
    }
  }

  if (app && this.opts.skipUninstall) {
    this.logger.info('Launch channel');

    await this.launchApp();
  } else {
    this.logger.info('Install channel');

    await this.installApp(appPath);
  }

  return session;
}
