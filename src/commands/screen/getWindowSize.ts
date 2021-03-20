import { Driver } from '../../Driver';

export async function getWindowSize(this: Driver): Promise<{ width: number; height: number }> {
  const { width, height } = await this.getWindowRect();
  return { width, height };
}
