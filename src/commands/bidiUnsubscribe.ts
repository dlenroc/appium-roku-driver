import { BaseDriver } from '@appium/base-driver';
import type { Driver } from '../Driver.ts';

export async function bidiUnsubscribe(
  this: Driver,
  events: string[],
  contexts: string[]
): Promise<void> {
  await BaseDriver.prototype.bidiUnsubscribe.call(this, events, contexts);

  if (this.socket && !this.bidiEventSubs['log.entryAdded']) {
    this.socket.end();
    this.socket = undefined;
  }
}
