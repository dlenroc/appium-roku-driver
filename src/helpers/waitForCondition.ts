/// <reference path='../../types/asyncbox.d.ts'/>

import { waitForCondition as wait } from 'asyncbox';
import Driver from '..';

export async function waitForCondition(this: Driver, { error, condition, timeout = 5000, interval = 100 }: { error: string | Error; condition: () => any; timeout?: number; interval?: number }) {
  await wait(condition, {
    error,
    waitMs: timeout,
    intervalMs: interval,
    logger: this.logger,
  });
}
