import { Driver } from '../Driver';

export async function execute(this: Driver, script: string, args: unknown[]): Promise<unknown> {
  const [component, method] = script.split(':');
  const roku = this.roku as any;

  if (!roku[component]?.[method]) {
    return this.logger.errorAndThrow(new this.errors.InvalidArgumentError(`Script format must be "<component>:<method_name>"`));
  }

  return roku[component][method](...args);
}
