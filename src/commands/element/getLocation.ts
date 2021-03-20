import { Driver } from '../../Driver';

export async function getLocation(this: Driver, elementId: string): Promise<{ x: number; y: number }> {
  const element = await this.getElOrEls('element-id', elementId);

  if (!element.bounds) {
    return this.logger.errorAndThrow(new this.errors.ElementNotVisibleError());
  }

  const { x, y } = element.bounds;
  return { x, y };
}
