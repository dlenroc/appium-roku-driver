declare module 'asyncbox' {
  import type { logger as Logger } from '@appium/support';

  function longSleep(ms: number): Promise<void>;

  function waitForCondition(condition: () => Promise<Boolean>, { error, waitMs, intervalMs, logger }: { error: string | Error; waitMs: number; intervalMs: number; logger: Logger });
}
