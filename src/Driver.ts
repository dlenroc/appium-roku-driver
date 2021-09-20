/// <reference path='../types/appium-support.d.ts'/>
/// <reference path='../types/appium-base-driver.d.ts'/>

import { BaseDriver, errors, OmitFirstArg } from '@appium/base-driver';
import { logger } from '@appium/support';
import { SDK } from '@dlenroc/roku';
import { activateApp } from './commands/app/activateApp';
import { background } from './commands/app/background';
import { closeApp } from './commands/app/closeApp';
import { installApp } from './commands/app/installApp';
import { isAppInstalled } from './commands/app/isAppInstalled';
import { launchApp } from './commands/app/launchApp';
import { queryAppState } from './commands/app/queryAppState';
import { removeApp } from './commands/app/removeApp';
import { reset } from './commands/app/reset';
import { terminateApp } from './commands/app/terminateApp';
import { getContexts } from './commands/context/getContexts';
import { getCurrentContext } from './commands/context/getCurrentContext';
import { setContext } from './commands/context/setContext';
import { getAlertText } from './commands/dialog/getAlertText';
import { isAlertShown } from './commands/dialog/isAlertShown';
import { postAcceptAlert } from './commands/dialog/postAcceptAlert';
import { postDismissAlert } from './commands/dialog/postDismissAlert';
import { setAlertText } from './commands/dialog/setAlertText';
import { active } from './commands/element/active';
import { clear } from './commands/element/clear';
import { click } from './commands/element/click';
import { elementDisplayed } from './commands/element/elementDisplayed';
import { elementEnabled } from './commands/element/elementEnabled';
import { elementSelected } from './commands/element/elementSelected';
import { findElOrEls, getElOrEls } from './commands/element/findElOrEls';
import { getAttribute } from './commands/element/getAttribute';
import { getElementRect } from './commands/element/getElementRect';
import { getLocation } from './commands/element/getLocation';
import { getName } from './commands/element/getName';
import { getSize } from './commands/element/getSize';
import { getText } from './commands/element/getText';
import { replaceValue } from './commands/element/replaceValue';
import { setValue } from './commands/element/setValue';
import { setValueImmediate } from './commands/element/setValueImmediate';
import { submit } from './commands/element/submit';
import { pullFile } from './commands/files/pullFile';
import { pullFolder } from './commands/files/pullFolder';
import { pushFile } from './commands/files/pushFile';
import { waitForCondition } from './commands/helpers/waitForCondition';
import { execute } from './commands/interaction/execute';
import { performActions } from './commands/interaction/performActions';
import { releaseActions } from './commands/interaction/releaseActions';
import { setUrl } from './commands/interaction/setUrl';
import { hideKeyboard } from './commands/keyboard/hideKeyboard';
import { isKeyboardShown } from './commands/keyboard/isKeyboardShown';
import { getPageSource } from './commands/screen/getPageSource';
import { getScreenshot } from './commands/screen/getScreenshot';
import { getWindowRect } from './commands/screen/getWindowRect';
import { getWindowSize } from './commands/screen/getWindowSize';
import { isLocked } from './commands/screensaver/isLocked';
import { unlock } from './commands/screensaver/unlock';
import { createSession } from './commands/session/createSession';
import { deleteSession } from './commands/session/deleteSession';
import { updateSettings } from './commands/settings/updateSettings';

export class Driver extends BaseDriver {
  protected pressedKey?: string;

  // @ts-ignore
  public roku: SDK;
  public errors = errors;
  public logger = logger.getLogger('RokuDriver');

  // Session
  public createSession: OmitFirstArg<typeof createSession> = createSession.bind(this, this.createSession.bind(this));
  public deleteSession: OmitFirstArg<typeof deleteSession> = deleteSession.bind(this, this.deleteSession.bind(this));

  // Setting
  public updateSettings: OmitFirstArg<typeof updateSettings> = updateSettings.bind(this, this.updateSettings.bind(this));

  // Interaction
  public execute = execute;
  public performActions = performActions;
  public releaseActions = releaseActions;
  public setUrl = setUrl;

  // Context
  public getContexts = getContexts;
  public getCurrentContext = getCurrentContext;
  public setContext = setContext;

  // Dialog
  public getAlertText = getAlertText;
  public isAlertShown = isAlertShown;
  public postAcceptAlert = postAcceptAlert;
  public postDismissAlert = postDismissAlert;
  public setAlertText = setAlertText;

  // Screensaver
  public isLocked = isLocked;
  public unlock = unlock;

  // Screen
  public getPageSource = getPageSource;
  public getScreenshot = getScreenshot;
  public getWindowRect = getWindowRect;
  public getWindowSize = getWindowSize;

  // Keyboard
  public hideKeyboard = hideKeyboard;
  public isKeyboardShown = isKeyboardShown;

  // App
  public activateApp = activateApp;
  public background = background;
  public closeApp = closeApp;
  public installApp = installApp;
  public isAppInstalled = isAppInstalled;
  public launchApp = launchApp;
  public queryAppState = queryAppState;
  public removeApp = removeApp;
  public reset = reset;
  public terminateApp = terminateApp;

  // Element
  public getElOrEls = getElOrEls;
  public active = active;
  public clear = clear;
  public click = click;
  public elementDisplayed = elementDisplayed;
  public elementEnabled = elementEnabled;
  public elementSelected = elementSelected;
  // @ts-ignore because base driver only returns an element (but in fact it can return multiple elements as well)
  public findElOrEls = findElOrEls;
  public getAttribute = getAttribute;
  public getElementRect = getElementRect;
  public getLocation = getLocation;
  public getName = getName;
  public getSize = getSize;
  public getText = getText;
  public replaceValue = replaceValue;
  public setValue = setValue;
  public setValueImmediate = setValueImmediate;
  public submit = submit;

  // Files
  public pullFile = pullFile;
  public pullFolder = pullFolder;
  public pushFile = pushFile;

  // Helpers
  protected waitForCondition = waitForCondition;

  // Configurations
  protected locatorStrategies = ['id', 'tag name', 'css selector', 'xpath'];
  // @ts-ignore because base driver defines it as an ancestor
  protected desiredCapConstraints = {
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

  static newMethodMap = {
    '/session/:sessionId/alert': {
      GET: { command: 'isAlertShown' },
    },
    '/session/:sessionId/actions': {
      POST: { command: 'performActions', payloadParams: { required: ['actions'] } },
      DELETE: { command: 'releaseActions' },
    },
  };
}
