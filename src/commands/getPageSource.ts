import * as ecp from '@dlenroc/roku-ecp';
import * as odc from '@dlenroc/roku-odc';
import type { Driver } from '../Driver.ts';

export async function getPageSource(this: Driver): Promise<string> {
  if (this.opts.context === 'ODC') {
    const fields = this.fields ? { fields: this.fields } : undefined;
    return odc.getAppUI(this.sdk.odc, fields);
  } else {
    return ecp.queryAppUI(this.sdk.ecp);
  }
}
