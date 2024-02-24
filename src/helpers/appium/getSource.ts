import * as ecp from '@dlenroc/roku-ecp';
import * as odc from '@dlenroc/roku-odc';
import type { Driver } from '../../Driver.ts';
import * as domUtils from '../dom.js';

export async function getSource(
  this: Driver,
  fields: Record<string, string[]> = {}
): Promise<Document> {
  let xml: string;

  if (this.opts.context === 'ODC') {
    xml = await odc.getAppUI(this.sdk.odc, { fields });
  } else {
    xml = await ecp.queryAppUI(this.sdk.ecp);
  }

  return domUtils.parse(xml);
}
