import { Driver } from '../../Driver';

export async function unlock(this: Driver): Promise<void> {
  const isLocked = await this.isLocked();

  if (!isLocked) {
    return;
  }

  await this.roku.ecp.keypress('Enter');
  await this.waitForCondition({
    error: 'Screensaver is still visible',
    condition: async () => {
      const isLocked = await this.isLocked();
      return !isLocked;
    },
  });
}
