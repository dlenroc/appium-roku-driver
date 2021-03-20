import { Driver } from '../../Driver';

export async function execute(this: Driver, script: string, ...args: any[]): Promise<any> {
  const [component, method] = script.split(':');

  if (!this.roku[component]?.[method]) {
    return this.logger.errorAndThrow(new this.errors.InvalidArgumentError(`Script format must be "<component>:<method_name>"`));
  }

  return this.roku[component][method](...args);
}
