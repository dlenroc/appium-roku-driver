import { BaseDriver, DeviceSettings } from '@appium/base-driver';
import { logger } from '@appium/support';
import { ExternalDriver } from '@appium/types';
import type { SDK } from '@dlenroc/roku';
import { capabilitiesConstraints } from './CapabilitiesConstraints';
import { activateApp } from './commands/activateApp';
import { active } from './commands/active';
import { background } from './commands/background';
import { clear } from './commands/clear';
import { click } from './commands/click';
import { closeApp } from './commands/closeApp';
import { createSession } from './commands/createSession';
import { deleteSession } from './commands/deleteSession';
import { elementDisplayed } from './commands/elementDisplayed';
import { elementSelected } from './commands/elementSelected';
import { execute } from './commands/execute';
import { findElOrEls } from './commands/findElOrEls';
import { getAlertText } from './commands/getAlertText';
import { getContexts } from './commands/getContexts';
import { getCurrentContext } from './commands/getCurrentContext';
import { getElementRect } from './commands/getElementRect';
import { getName } from './commands/getName';
import { getPageSource } from './commands/getPageSource';
import { getProperty } from './commands/getProperty';
import { getScreenshot } from './commands/getScreenshot';
import { getText } from './commands/getText';
import { getWindowRect } from './commands/getWindowRect';
import { hideKeyboard } from './commands/hideKeyboard';
import { installApp } from './commands/installApp';
import { isAlertShown } from './commands/isAlertShown';
import { isAppInstalled } from './commands/isAppInstalled';
import { isKeyboardShown } from './commands/isKeyboardShown';
import { isLocked } from './commands/isLocked';
import { launchApp } from './commands/launchApp';
import { performActions } from './commands/performActions';
import { postAcceptAlert } from './commands/postAcceptAlert';
import { postDismissAlert } from './commands/postDismissAlert';
import { pullFile } from './commands/pullFile';
import { pullFolder } from './commands/pullFolder';
import { pushFile } from './commands/pushFile';
import { queryAppState } from './commands/queryAppState';
import { releaseActions } from './commands/releaseActions';
import { removeApp } from './commands/removeApp';
import { replaceValue } from './commands/replaceValue';
import { reset } from './commands/reset';
import { setAlertText } from './commands/setAlertText';
import { setContext } from './commands/setContext';
import { setUrl } from './commands/setUrl';
import { setValue } from './commands/setValue';
import { terminateApp } from './commands/terminateApp';
import { unlock } from './commands/unlock';
import { updateSetting } from './commands/updateSetting';
import { getElement } from './helpers/getElement';
import { getElements } from './helpers/getElements';
import { getSelector } from './helpers/getSelector';
import { retrying } from './helpers/retrying';
import { waitForCondition } from './helpers/waitForCondition';

export class Driver extends BaseDriver<typeof capabilitiesConstraints> implements ExternalDriver<typeof capabilitiesConstraints> {
  static newMethodMap = {
    '/session/:sessionId/alert': {
      GET: { command: 'isAlertShown' },
    },
  };

  protected roku!: SDK;
  protected pressedKey?: string | undefined;
  protected logger = logger.getLogger('RokuDriver');

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
  public isAlertShown = isAlertShown; // Chrome Specific
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
  public override locatorStrategies = ['id', 'tag name', 'link text', 'partial link text', 'css selector', 'xpath'];
  public override settings = new DeviceSettings({}, updateSetting.bind(this));
  public override supportedLogTypes = {};
}
