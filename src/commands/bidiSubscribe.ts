import { BaseDriver } from '@appium/base-driver';
import { Socket } from 'node:net';
import type { Driver } from '../Driver.ts';

export async function bidiSubscribe(
  this: Driver,
  events: string[],
  contexts: string[]
): Promise<void> {
  await BaseDriver.prototype.bidiSubscribe.call(this, events, contexts);

  if (!this.socket && this.bidiEventSubs['log.entryAdded']) {
    this.socket = new Socket({ signal: this.sdk.controller.signal });
    this.socket.connect(8085, this.opts.ip);
    this.socket.setEncoding('utf8');
    this.socket.on('data', (text) => {
      this.eventEmitter.emit('bidiEvent', {
        method: 'log.entryAdded',
        params: {
          level: 'debug',
          text,
          timestamp: Date.now(),
          type: 'brightscript',
        },
      });
    });
  }
}
