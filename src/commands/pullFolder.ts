import JSZip from 'jszip';
import type { Driver } from '../Driver.ts';

export async function pullFolder(this: Driver, path: string): Promise<string> {
  const root = path;
  const sdk = this.sdk;
  const zip = new JSZip();
  const tree = await sdk.odc.getFiles({ path: root });

  await (async function addFilesInZip(
    currentPath: string,
    files: any[]
  ): Promise<void> {
    for (const file of files) {
      const path = `${currentPath}/${file.name}`;
      const fullPath = `${root}/${path}`;

      if (file.type === 'file') {
        zip.file(path, await sdk.odc.pullFile({ path: fullPath }));
      }

      if (file.type === 'directory') {
        await addFilesInZip(path, file.children);
      }
    }
  })('', tree);

  return zip.generateAsync({ type: 'base64' });
}
