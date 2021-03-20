import { Driver } from '../../Driver';

export async function getSize(this: Driver, elementId: string): Promise<{ width: number; height: number }> {
  const element = await this.getElOrEls('element-id', elementId);

  if (!element.bounds) {
    return this.logger.errorAndThrow(new this.errors.ElementNotVisibleError());
  }

  const { width, height } = element.bounds;
  return { width, height };
}
