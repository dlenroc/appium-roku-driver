import type { Driver } from '../Driver.ts';

export async function getPageSource(this: Driver): Promise<string> {
  if (this.opts.context === 'ODC') {
    const fields = this.fields ? { fields: this.fields } : undefined;
    return this.sdk.odc.getAppUI(fields);
  } else {
    return this.sdk.ecp.queryAppUI();
  }
}
