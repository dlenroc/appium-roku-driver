import type { Driver } from '../Driver.ts';

export async function releaseActions(this: Driver): Promise<void> {
  if (this.pressedKey) {
    await this.performActions([
      {
        id: 'remote',
        type: 'key',
        actions: [{ type: 'keyUp', value: this.pressedKey }],
      },
    ]);
  }
}
