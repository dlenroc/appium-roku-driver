declare module 'asyncbox' {

  function longSleep(ms: number): Promise<void>;
  function waitForCondition(condition: () => Promise<Boolean>, options: WaitOptions);

  type WaitOptions = { error: string | Error; waitMs: number; intervalMs: number; logger: Logger };
}
