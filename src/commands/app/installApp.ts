import { promises as fs } from 'fs';
import { Driver } from '../../Driver';

export async function installApp(this: Driver, appPath: string): Promise<void> {
  const app = await fs.readFile(appPath);
  const patchedApp = await this.roku.odc.extend(app);
  await this.roku.developerServer.install(patchedApp);
}
