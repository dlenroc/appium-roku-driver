import * as debugServerCommands from '@dlenroc/roku-debug-server';
import { DebugServerExecutor } from '@dlenroc/roku-debug-server';
import * as developerServerCommands from '@dlenroc/roku-developer-server';
import { DeveloperServerExecutor } from '@dlenroc/roku-developer-server';
import * as ecpCommands from '@dlenroc/roku-ecp';
import { ECPExecutor } from '@dlenroc/roku-ecp';
import * as odcCommands from '@dlenroc/roku-odc';
import { ODCExecutor } from '@dlenroc/roku-odc';
import { setMaxListeners } from 'events';

interface DebugServer extends ExtendedType<typeof debugServerCommands> {}
class DebugServer {
  constructor(public executor: DebugServerExecutor) {}
}
extend(DebugServer.prototype, debugServerCommands);

interface DeveloperServer
  extends ExtendedType<typeof developerServerCommands> {}
class DeveloperServer {
  constructor(public executor: DeveloperServerExecutor) {}
}
extend(DeveloperServer.prototype, developerServerCommands);

interface ECP extends ExtendedType<typeof ecpCommands> {}
class ECP {
  constructor(public executor: ECPExecutor) {}
}
extend(ECP.prototype, ecpCommands);

interface ODC extends ExtendedType<typeof odcCommands> {}
class ODC {
  constructor(public executor: ODCExecutor) {}
}
extend(ODC.prototype, odcCommands);

type ExtendedType<Source> = {
  [Key in keyof Source]: Source[Key] extends (
    ctx: any,
    ...args: infer Args
  ) => infer Return
    ? (...args: Args) => Return
    : never;
};

function extend(target: any, source: any) {
  for (const [key, value] of Object.entries(source)) {
    if (typeof value === 'function') {
      const argsLength = value.length > 0 ? value.length - 1 : 0;
      target[key] = function (...args: any[]) {
        return (value as any)(this.executor, ...args);
      };

      Object.defineProperty(target[key], 'length', {
        get() {
          return argsLength;
        },
      });
    }
  }
}

export class SDK {
  readonly controller = new AbortController();
  readonly debugServer: DebugServer;
  readonly developerServer: DeveloperServer;
  readonly ecp: ECP;
  readonly odc: ODC;

  constructor(
    public options:
      | SDK
      | {
          ip: string;
          username: string;
          password: string;
          signal?: AbortSignal;
        }
  ) {
    if (options instanceof SDK) {
      let initialOptions = options.options;
      while (initialOptions instanceof SDK) {
        initialOptions = initialOptions.options;
      }

      options = {
        ip: initialOptions.ip,
        username: initialOptions.username,
        password: initialOptions.password,
      };
    }

    const signal = options.signal
      ? // @ts-ignore
        AbortSignal.any([this.controller.signal, options.signal])
      : this.controller.signal;

    setMaxListeners(0, signal);

    this.debugServer = new DebugServer(
      new DebugServerExecutor({
        signal,
        hostname: options.ip,
        port: 8085,
      })
    );

    this.developerServer = new DeveloperServer(
      new DeveloperServerExecutor({
        signal,
        address: `http://${options.ip}`,
        username: options.username,
        password: options.password,
      })
    );

    this.ecp = new ECP(
      new ECPExecutor({
        signal,
        address: `http://${options.ip}:8060`,
      })
    );

    this.odc = new ODC(
      new ODCExecutor({
        signal,
        address: `http://${options.ip}:8061`,
      })
    );
  }
}
