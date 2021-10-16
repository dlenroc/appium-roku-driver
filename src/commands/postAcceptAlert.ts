import { Driver } from '../Driver';

export async function postAcceptAlert(this: Driver): Promise<void> {
  if (!(await this.isAlertShown())) {
    throw new this.errors.NoAlertOpenError();
  }

  const button = this.roku.document.xpathSelect('//*[substring(name(), string-length(name()) - string-length("Dialog") + 1) = "Dialog"]//*[substring(name(), string-length(name()) - string-length("Button") + 1) = "Button"]');

  if (!button) {
    throw new this.errors.InvalidElementStateError('Failed to accept dialog');
  }

  await button.select();

  await this.helpers.waitForCondition({
    error: 'Dialog is still visible',
    condition: async () => {
      const isAlertShown = await this.isAlertShown();
      return !isAlertShown;
    },
  });
}
