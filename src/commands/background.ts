/// <reference path='../../types/asyncbox.d.ts'/>

import { errors } from '@appium/base-driver';
import * as ecp from '@dlenroc/roku-ecp';
import { longSleep } from 'asyncbox';
import type { Driver } from '../Driver.ts';

export async function background(
  this: Driver,
  seconds: null | number
): Promise<void> {
  const activeApp = await ecp.queryActiveApp(this.sdk.ecp);
  const app = activeApp.app;

  if (!('id' in app)) {
    throw new errors.InvalidArgumentError(`Channel is not running`);
  }

  await this.closeApp();

  if (seconds === null || seconds === -1) {
    return;
  }

  await longSleep(seconds * 1000);
  await this.activateApp(String(app.id));
}
