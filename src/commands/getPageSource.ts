import * as ecp from '@dlenroc/roku-ecp';
import * as odc from '@dlenroc/roku-odc';
import type { Driver } from '../Driver.ts';

export async function getPageSource(this: Driver): Promise<string> {
  if (this.document.context === 'ODC') {
    return odc.getAppUI(this.sdk.odc);
  } else {
    return ecp.queryAppUI(this.sdk.ecp);
  }
}
