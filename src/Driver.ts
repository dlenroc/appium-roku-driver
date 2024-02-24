import { BaseDriver, DeviceSettings } from '@appium/base-driver';
import type { ExternalDriver } from '@appium/types';
import type { Executor as DebugServerExecutor } from '@dlenroc/roku-debug-server';
import type { Executor as DeveloperServerExecutor } from '@dlenroc/roku-developer-server';
import type { Executor as ECPExecutor } from '@dlenroc/roku-ecp';
import type { Executor as ODCExecutor } from '@dlenroc/roku-odc';
import { capabilitiesConstraints } from './CapabilitiesConstraints.js';
import * as Commands from './commands.js';
import { updateSetting } from './commands/internal/updateSetting.js';

class RokuDriver
  extends BaseDriver<typeof capabilitiesConstraints>
  implements ExternalDriver<typeof capabilitiesConstraints>
{
  // Configurations
  public override desiredCapConstraints = capabilitiesConstraints;
  public override settings = new DeviceSettings({}, updateSetting.bind(this));
  public override supportedLogTypes = {};
  public override locatorStrategies = [
    'tag name',
    'link text',
    'partial link text',
    'css selector',
    'xpath',
  ];

  protected controller?: AbortController;
  protected pressedKey?: string | undefined;
  protected fields: Record<string, string[]> | undefined;
  protected sdk!: {
    debugServer: DebugServerExecutor;
    developerServer: DeveloperServerExecutor;
    ecp: ECPExecutor;
    odc: ODCExecutor;
  };
}

type Commands = typeof Commands;
type RokuCommands = { [Command in keyof Commands]: Commands[Command] };
interface RokuDriver extends RokuCommands {}
for (const command in Commands) {
  (RokuDriver.prototype as any)[command] = (Commands as any)[command];
}

export { RokuDriver as Driver };
