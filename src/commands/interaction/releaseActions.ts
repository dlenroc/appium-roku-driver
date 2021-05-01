import { Driver } from '../../Driver';

export async function releaseActions(this: Driver): Promise<void> {
  if (this.pressedKey) {
    await this.performActions({ type: 'keyUp', value: this.pressedKey });
  }
}
