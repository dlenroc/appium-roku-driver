/// <reference path='../types/appium-support.d.ts'/>
/// <reference path='../types/appium-base-driver.d.ts'/>

import { BaseDriver, DriverHelpers, errors, OmitFirstArg } from '@appium/base-driver';
import { logger } from '@appium/support';
import { SDK } from '@dlenroc/roku';
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
import { updateSettings } from './commands/updateSettings';
import { getElement } from './helpers/getElement';
import { getElements } from './helpers/getElements';
import { getSelector } from './helpers/getSelector';
import { waitForCondition } from './helpers/waitForCondition';

export class Driver extends BaseDriver {
  static newMethodMap = {
    '/session/:sessionId/alert': {
      GET: { command: 'isAlertShown' },
    },
  };

  // @ts-ignore
  protected roku: SDK;
  protected errors = errors;
  protected pressedKey?: string;
  protected logger = logger.getLogger('RokuDriver');

  public helpers = Object.assign(
    {
      getElement: getElement.bind(this),
      getElements: getElements.bind(this),
      getSelector: getSelector.bind(this),
      waitForCondition: waitForCondition.bind(this),
    },
    super.helpers as DriverHelpers
  );

  // WebDriver
  public createSession: OmitFirstArg<typeof createSession> = createSession.bind(this, super.createSession.bind(this));
  public deleteSession: OmitFirstArg<typeof deleteSession> = deleteSession.bind(this, super.deleteSession.bind(this));
  public setUrl = setUrl;
  public getWindowRect = getWindowRect;
  public active = active;
  public findElOrEls = findElOrEls;
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
  public getPageSource = getPageSource;
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
  public reset = reset;
  public background = background;
  public setValueImmediate = replaceValue;
  public replaceValue = replaceValue;
  public updateSettings: OmitFirstArg<typeof updateSettings> = updateSettings.bind(this, super.updateSettings.bind(this));
  public getCurrentContext = getCurrentContext;
  public setContext = setContext;
  public getContexts = getContexts;

  // Configurations
  public supportedLogTypes = {};
  public locatorStrategies = ['id', 'tag name', 'css selector', 'xpath'];

  public get desiredCapConstraints() {
    return {
      app: {
        isString: true,
        presence: true,
      },
      ip: {
        isString: true,
        presence: true,
      },
      password: {
        isString: true,
        presence: true,
      },
      username: {
        isString: true,
        presence: false,
      },
      context: {
        isString: true,
        presence: false,
        inclusion: ['ECP', 'ODC'],
      },
      registry: {
        isObject: true,
        presence: false,
      },
      arguments: {
        isObject: true,
        presence: false,
      },
      entryPoint: {
        isString: true,
        presence: false,
        inclusion: ['channel', 'screensaver', 'screensaver-settings'],
      },
    };
  }
}
