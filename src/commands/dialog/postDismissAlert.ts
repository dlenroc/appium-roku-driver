import { Driver } from '../../Driver';

export async function postDismissAlert(this: Driver): Promise<void> {
  if (!(await this.isAlertShown())) {
    throw new this.errors.NoAlertOpenError();
  }

  await this.roku.ecp.keypress('Back');

  await this.waitForCondition({
    error: 'Dialog is still visible',
    condition: async () => {
      const isAlertShown = await this.isAlertShown();
      return !isAlertShown;
    },
  });
}
