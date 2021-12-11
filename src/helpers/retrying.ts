import { longSleep } from 'asyncbox';
import { performance } from 'perf_hooks';
import type { Driver } from '../Driver';

export async function retrying<Type>(this: Driver, options: { timeout: number; command: () => Promise<Type>; validate: (result?: Type, error?: any) => boolean }): Promise<Type> {
  const duration = 500;
  const endTimestamp = performance.now() + options.timeout;

  while (true) {
    let result;
    let exception;
    let hasException;

    await this.clearNewCommandTimeout();

    try {
      result = await options.command();
    } catch (e) {
      exception = e;
      hasException = true;
    }

    const isValid = options.validate(result, exception);
    const elapsed = endTimestamp - performance.now();

    if (isValid || elapsed <= 0) {
      if (hasException) {
        throw exception;
      } else {
        return result as Type;
      }
    }

    if (elapsed > duration) {
      await longSleep(duration);
    } else {
      await longSleep(elapsed);
    }
  }
}
