import { errors } from '@appium/base-driver';
import type { Driver } from '../Driver.ts';

export async function execute(
  this: Driver,
  script: string,
  args: unknown[]
): Promise<unknown> {
  const [component, method] = script.split(':');
  if (!component || !method) {
    throw new errors.InvalidArgumentError(
      `Script format must be "<component>:<method_name>"`
    );
  }

  if (!(component in this.sdk)) {
    throw new errors.InvalidArgumentError(
      `Component "${component}" is not supported`
    );
  }

  if (
    !(method in (this.sdk as any)[component]) ||
    typeof (this.sdk as any)[component][method] !== 'function'
  ) {
    throw new errors.InvalidArgumentError(
      `Method "${method}" is not supported for component "${component}"`
    );
  }

  const fn = (this.sdk as any)[component][method];
  if (args.length && fn.length < 2) {
    throw new errors.InvalidArgumentError(
      `Method "${method}" from component "${component}" does not accept arguments`
    );
  }

  return args.length
    ? (this.sdk as any)[component][method](args[0])
    : (this.sdk as any)[component][method]();
}
