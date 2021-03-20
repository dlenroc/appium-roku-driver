import Driver from '../..';

export async function withContext<T>(this: Driver, context: string, fn: () => T | Promise<T>): Promise<T> {
  const currentContext = await this.getCurrentContext();

  try {
    await this.setContext(context);
    return await fn();
  } finally {
    await this.setContext(currentContext);
  }
}
