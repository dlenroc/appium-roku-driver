import { BaseDriver } from '@appium/base-driver';
import type { Driver } from '../Driver.ts';

const pendingCommandsCount = Symbol('pendingCommandCount');

export async function executeCommand<T = unknown>(
  this: Driver,
  cmd: string,
  ...args: any[]
): Promise<T> {
  const self = this as any;
  self[pendingCommandsCount] = (self[pendingCommandsCount] || 0) + 1;
  return BaseDriver.prototype.executeCommand
    .call(this, cmd, ...args)
    .finally(async () => {
      if (--self[pendingCommandsCount] === 0) {
        await this.startNewCommandTimeout();
      }
    }) as Promise<T>;
}
