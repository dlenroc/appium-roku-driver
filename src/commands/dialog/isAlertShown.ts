import { Driver } from '../../Driver';

export async function isAlertShown(this: Driver): Promise<boolean> {
  try {
    await this.getElOrEls('xpath', '//*[substring(name(), string-length(name()) - string-length("Dialog") + 1) = "Dialog"]');

    return true;
  } catch (e) {
    if (e instanceof this.errors.NoSuchElementError) {
      return false;
    }

    throw e;
  }
}
