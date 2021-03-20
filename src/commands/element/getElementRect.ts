import { Driver } from '../../Driver';

export async function getElementRect(this: Driver, elementId: string): Promise<{ x: number; y: number; width: number; height: number }> {
  const element = await this.getElOrEls('element-id', elementId);

  if (!element.bounds) {
    return this.logger.errorAndThrow(new this.errors.ElementNotVisibleError());
  }

  return element.bounds;
}
