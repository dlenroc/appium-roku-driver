import { BaseDriver, DeviceSettings } from '@appium/base-driver';
import { ExternalDriver } from '@appium/types';
import type { SDK } from '@dlenroc/roku';
import type { Executor as DeveloperServerExecutor } from '@dlenroc/roku-developer-server';
import type { Executor as ECPExecutor } from '@dlenroc/roku-ecp';
import type { Executor as ODCExecutor } from '@dlenroc/roku-odc';
import type { Document } from 'roku-dom';
import { capabilitiesConstraints } from './CapabilitiesConstraints.js';
import { activateApp } from './commands/activateApp.js';
import { active } from './commands/active.js';
import { background } from './commands/background.js';
import { clear } from './commands/clear.js';
import { click } from './commands/click.js';
import { closeApp } from './commands/closeApp.js';
import { createSession } from './commands/createSession.js';
import { deleteSession } from './commands/deleteSession.js';
import { elementDisplayed } from './commands/elementDisplayed.js';
import { elementSelected } from './commands/elementSelected.js';
import { execute } from './commands/execute.js';
import { findElOrEls } from './commands/findElOrEls.js';
import { getAlertText } from './commands/getAlertText.js';
import { getContexts } from './commands/getContexts.js';
import { getCurrentContext } from './commands/getCurrentContext.js';
import { getElementRect } from './commands/getElementRect.js';
import { getName } from './commands/getName.js';
import { getPageSource } from './commands/getPageSource.js';
import { getProperty } from './commands/getProperty.js';
import { getScreenshot } from './commands/getScreenshot.js';
import { getText } from './commands/getText.js';
import { getWindowRect } from './commands/getWindowRect.js';
import { hideKeyboard } from './commands/hideKeyboard.js';
import { installApp } from './commands/installApp.js';
import { isAlertShown } from './commands/isAlertShown.js';
import { isAppInstalled } from './commands/isAppInstalled.js';
import { isKeyboardShown } from './commands/isKeyboardShown.js';
import { isLocked } from './commands/isLocked.js';
import { launchApp } from './commands/launchApp.js';
import { performActions } from './commands/performActions.js';
import { postAcceptAlert } from './commands/postAcceptAlert.js';
import { postDismissAlert } from './commands/postDismissAlert.js';
import { pullFile } from './commands/pullFile.js';
import { pullFolder } from './commands/pullFolder.js';
import { pushFile } from './commands/pushFile.js';
import { queryAppState } from './commands/queryAppState.js';
import { releaseActions } from './commands/releaseActions.js';
import { removeApp } from './commands/removeApp.js';
import { replaceValue } from './commands/replaceValue.js';
import { reset } from './commands/reset.js';
import { setAlertText } from './commands/setAlertText.js';
import { setContext } from './commands/setContext.js';
import { setUrl } from './commands/setUrl.js';
import { setValue } from './commands/setValue.js';
import { terminateApp } from './commands/terminateApp.js';
import { unlock } from './commands/unlock.js';
import { updateSetting } from './commands/updateSetting.js';
import { getElement } from './helpers/getElement.js';
import { getElements } from './helpers/getElements.js';
import { getSelector } from './helpers/getSelector.js';
import { retrying } from './helpers/retrying.js';
import { waitForCondition } from './helpers/waitForCondition.js';

class RokuDriver
  extends BaseDriver<typeof capabilitiesConstraints>
  implements ExternalDriver<typeof capabilitiesConstraints>
{
  static newMethodMap = {
    '/session/:sessionId/alert': {
      GET: { command: 'isAlertShown' },
    },
  };

  protected abortController!: AbortController;
  protected pressedKey?: string | undefined;
  protected roku!: SDK;
  protected document: Document;
  protected sdk!: {
    developerServer: DeveloperServerExecutor;
    ecp: ECPExecutor;
    odc: ODCExecutor;
  };

  // Helpers
  protected getElement = getElement;
  protected getElements = getElements;
  protected getSelector = getSelector;
  protected retrying = retrying;
  protected waitForCondition = waitForCondition;

  // WebDriver
  public override createSession = createSession;
  public override deleteSession = deleteSession;
  public setUrl = setUrl;
  public getWindowRect = getWindowRect;
  public active = active;
  public override findElOrEls = findElOrEls;
  public elementSelected = elementSelected;
  public getAttribute = getProperty;
  public getProperty = getProperty;
  public getText = getText;
  public getName = getName;
  public getElementRect = getElementRect;
  public elementEnabled = elementDisplayed;
  public elementDisplayed = elementDisplayed;
  public click = click;
  public clear = clear;
  public setValue = setValue;
  public override getPageSource = getPageSource;
  public execute = execute;
  public performActions = performActions;
  public releaseActions = releaseActions;
  public isAlertShown = isAlertShown;
  public postDismissAlert = postDismissAlert;
  public postAcceptAlert = postAcceptAlert;
  public getAlertText = getAlertText;
  public setAlertText = setAlertText;
  public getScreenshot = getScreenshot;

  // Appium
  public unlock = unlock;
  public isLocked = isLocked;
  public installApp = installApp;
  public activateApp = activateApp;
  public removeApp = removeApp;
  public terminateApp = terminateApp;
  public isAppInstalled = isAppInstalled;
  public queryAppState = queryAppState;
  public hideKeyboard = hideKeyboard;
  public isKeyboardShown = isKeyboardShown;
  public pushFile = pushFile;
  public pullFile = pullFile;
  public pullFolder = pullFolder;
  public launchApp = launchApp;
  public closeApp = closeApp;
  public override reset = reset;
  public background = background;
  public setValueImmediate = replaceValue;
  public replaceValue = replaceValue;
  public getCurrentContext = getCurrentContext;
  public setContext = setContext;
  public getContexts = getContexts;

  // Configurations
  public override desiredCapConstraints = capabilitiesConstraints;
  public override locatorStrategies = [
    'id',
    'tag name',
    'link text',
    'partial link text',
    'css selector',
    'xpath',
  ];
  public override settings = new DeviceSettings({}, updateSetting.bind(this));
  public override supportedLogTypes = {};
}

export { RokuDriver as Driver };
