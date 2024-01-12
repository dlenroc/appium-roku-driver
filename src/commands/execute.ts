import { errors } from '@appium/base-driver';
import * as debugServer from '@dlenroc/roku-debug-server';
import * as developerServer from '@dlenroc/roku-developer-server';
import * as ecp from '@dlenroc/roku-ecp';
import * as odc from '@dlenroc/roku-odc';
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

  const sdk = { debugServer, developerServer, ecp, odc } as any;

  if (!(component in sdk)) {
    throw new errors.InvalidArgumentError(
      `Component "${component}" is not supported`
    );
  }

  const api = sdk[component];

  if (!(method in api) || typeof api[method] !== 'function') {
    throw new errors.InvalidArgumentError(
      `Method "${method}" is not supported for component "${component}"`
    );
  }

  const client = (this.sdk as any)[component];
  const fn = api[method] as Function;
  if (args.length && fn.length < 3) {
    throw new errors.InvalidArgumentError(
      `Method "${method}" from component "${component}" does not accept arguments`
    );
  }

  return args.length ? fn(client, args[0]) : fn(client);
}
