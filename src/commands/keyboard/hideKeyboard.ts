import { Driver } from '../../Driver';

export async function hideKeyboard(this: Driver): Promise<void> {
  await this.roku.ecp.keypress('Enter');
  await this.waitForCondition({
    error: 'Keyboard is still visible',
    condition: async () => {
      const isKeyboardShown = await this.isKeyboardShown();
      return !isKeyboardShown;
    },
  });
}
