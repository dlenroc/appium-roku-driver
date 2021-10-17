import cacache, { CacheObject } from 'cacache';
import { promises as fs } from 'fs';
import fetch from 'make-fetch-happen';
import { resolve } from 'path';
import { Driver } from '../Driver';

const CACHED_APPS_MAX_AGE = 1000 * 60 * 60 * 24; // 1 day

export async function loadChannel(this: Driver, pathOrUrl: string): Promise<Buffer> {
  let source;

  if (/^https?:\/\//.test(pathOrUrl)) {
    const cachePath = resolve(this.opts.tmpDir, 'appium-roku-driver');
    const response = await fetch(pathOrUrl, { cachePath });
    if (!response.ok) {
      throw new this.errors.SessionNotCreatedError(`Failed to download "${pathOrUrl}" -> ${response.status} ${response.statusText}`);
    }

    source = await response.buffer();

    const timestamp = Date.now();
    // @ts-ignore
    await cacache.verify(cachePath, { filter: (entry: CacheObject) => timestamp < entry.time + CACHED_APPS_MAX_AGE });
  } else {
    source = await fs.readFile(pathOrUrl);
  }

  return source;
}
