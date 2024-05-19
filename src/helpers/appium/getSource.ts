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

  const dom = domUtils.parse(xml);
  generateIds(dom);
  return dom;
}

function generateIds(node: Node): void {
  if (domUtils.isTag(node) && !node.hasAttribute('id')) {
    const id = node.getAttribute('uiElementId') || node.getAttribute('name');
    if (id) {
      node.setAttribute('id', id);
    }
  }

  if (node.hasChildNodes()) {
    for (let i = 0, n = node.childNodes.length; i < n; i++) {
      generateIds(node.childNodes[i]!);
    }
  }
}
