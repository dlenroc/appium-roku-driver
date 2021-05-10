import JSZip from 'jszip';
import { Driver } from '../../Driver';

export async function pullFolder(this: Driver, root: string): Promise<string> {
  const roku = this.roku;
  const zip = new JSZip();
  const tree = await roku.odc.getFiles(root);

  await (async function addFilesInZip(currentPath: string, files: any[]) {
    for (const file of files) {
      const path = `${currentPath}/${file.name}`;
      const fullPath = `${root}/${path}`;

      if (file.type === 'file') {
        zip.file(path, await roku.odc.pullFile(fullPath));
      }

      if (file.type === 'directory') {
        await addFilesInZip(path, file.children);
      }
    }
  })('', tree);

  return zip.generateAsync({ type: 'base64' });
}
