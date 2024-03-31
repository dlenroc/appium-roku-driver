import type { Driver } from '../../Driver.ts';
import * as domUtils from '../dom.js';

export async function getSource(
  this: Driver,
  fields: Record<string, string[]> = {}
): Promise<Document> {
  let xml: string;

  if (this.opts.context === 'ODC') {
    xml = await this.sdk.odc.getAppUI({ fields });
  } else {
    xml = await this.sdk.ecp.queryAppUI();
  }

  return domUtils.parse(xml);
}
