import { BaseDriver, DeviceSettings } from '@appium/base-driver';
import type { ExternalDriver } from '@appium/types';
import type { Executor as DebugServerExecutor } from '@dlenroc/roku-debug-server';
import type { Executor as DeveloperServerExecutor } from '@dlenroc/roku-developer-server';
import type { Executor as ECPExecutor } from '@dlenroc/roku-ecp';
import type { Executor as ODCExecutor } from '@dlenroc/roku-odc';
import { capabilitiesConstraints } from './CapabilitiesConstraints.js';
import { activateApp } from './commands/activateApp.js';
import { active } from './commands/active.js';
import { clear } from './commands/clear.js';
import { click } from './commands/click.js';
import { createSession } from './commands/createSession.js';
import { deleteSession } from './commands/deleteSession.js';
import { elementDisplayed } from './commands/elementDisplayed.js';
import { execute } from './commands/execute.js';
import { findElOrEls } from './commands/findElOrEls.js';
import { getAttribute } from './commands/getAttribute.js';
import { getContexts } from './commands/getContexts.js';
import { getCurrentContext } from './commands/getCurrentContext.js';
import { getElementRect } from './commands/getElementRect.js';
import { getName } from './commands/getName.js';
import { getPageSource } from './commands/getPageSource.js';
import { getProperty } from './commands/getProperty.js';
import { getScreenshot } from './commands/getScreenshot.js';
import { getText } from './commands/getText.js';
import { installApp } from './commands/installApp.js';
import { isAppInstalled } from './commands/isAppInstalled.js';
import { performActions } from './commands/performActions.js';
import { pullFile } from './commands/pullFile.js';
import { pullFolder } from './commands/pullFolder.js';
import { pushFile } from './commands/pushFile.js';
import { queryAppState } from './commands/queryAppState.js';
import { releaseActions } from './commands/releaseActions.js';
import { removeApp } from './commands/removeApp.js';
import { setContext } from './commands/setContext.js';
import { setUrl } from './commands/setUrl.js';
import { setValue } from './commands/setValue.js';
import { updateSetting } from './commands/updateSetting.js';

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

  // WebDriver
  public override createSession = createSession;
  public override deleteSession = deleteSession;
  public setUrl = setUrl;
  public active = active;
  public override findElOrEls = findElOrEls;
  public getAttribute = getAttribute;
  public getProperty = getProperty;
  public getText = getText;
  public getName = getName;
  public getElementRect = getElementRect;
  public elementDisplayed = elementDisplayed;
  public click = click;
  public clear = clear;
  public setValue = setValue;
  public override getPageSource = getPageSource;
  public execute = execute;
  public performActions = performActions;
  public releaseActions = releaseActions;
  public getScreenshot = getScreenshot;

  // Appium
  public installApp = installApp;
  public activateApp = activateApp;
  public removeApp = removeApp;
  public isAppInstalled = isAppInstalled;
  public queryAppState = queryAppState;
  public pushFile = pushFile;
  public pullFile = pullFile;
  public pullFolder = pullFolder;
  public getCurrentContext = getCurrentContext;
  public setContext = setContext;
  public getContexts = getContexts;
}

export { RokuDriver as Driver };
