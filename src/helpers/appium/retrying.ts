import { performance } from 'node:perf_hooks';
import { setTimeout as sleep } from 'node:timers/promises';

export async function retrying<Type>(options: {
  timeout: number;
  command: () => Promise<Type>;
  validate: (result?: Type, error?: unknown) => boolean;
}): Promise<Type> {
  const duration = 200;
  const endTimestamp = performance.now() + options.timeout;

  let exception: unknown;
  let hasException: boolean;
  let result: Type | undefined;

  while (true) {
    try {
      result = await options.command();
      hasException = false;
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
      await sleep(duration);
    } else {
      await sleep(elapsed);
    }
  }
}
