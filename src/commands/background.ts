/// <reference path='../../types/asyncbox.d.ts'/>

import { errors } from '@appium/base-driver';
import { longSleep } from 'asyncbox';
import type { Driver } from '../Driver';

export async function background(this: Driver, seconds: null | number): Promise<void> {
  const activeApp = await this.roku.ecp.queryActiveApp();
  const app = activeApp.app;

  if (typeof app === 'string') {
    throw new errors.InvalidArgumentError(`Channel is not running`);
  }

  await this.closeApp();

  if (seconds === null || seconds === -1) {
    return;
  }

  await longSleep(seconds * 1000);
  await this.activateApp(String(app.id));
}
