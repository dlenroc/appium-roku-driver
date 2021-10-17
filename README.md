# Appium Roku Driver · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/appium-roku-driver?cacheSeconds=86400)](https://www.npmjs.com/package/@dlenroc/appium-roku-driver) ![Node.js Version](https://img.shields.io/node/v/@dlenroc/appium-roku-driver) [![Node.js CI](https://github.com/dlenroc/appium-roku-driver/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/dlenroc/appium-roku-driver/actions/workflows/nodejs.yml)

Roku Driver is a WebDriver that allows testing channels/screensavers using any webdriver client.

## Prerequisites

- Appium 2
- Roku Device with fresh OS and mentioned below settings:
  - [Roku OS 9.4 or Newest](https://support.roku.com/en-gb/article/208755668)
  - [Enable Developer Settings](https://developer.roku.com/en-gb/docs/developer-program/getting-started/developer-setup.md#step-1-set-up-your-roku-device-to-enable-developer-settings)
  - [Disable Screensaver](https://www.solveyourtech.com/how-to-disable-the-screensaver-on-a-roku-tv/) (optional)

## Installation

```sh
appium driver install --source npm @dlenroc/appium-roku-driver
```

## Documentation

Thanks to the [Appium](https://github.com/appium/appium) and [WebDriver](https://www.w3.org/TR/webdriver/) protocol, this driver works just like other web drivers, but there are a couple of things worth mentioning.

### Initialization

Like other drivers, roku-driver by default uses the so-called `fast reset` algorithm, in which registries are cleared before each test, and a full reinstallation occurs only if the channel differs from the one already installed.

Can be tunned using `noReset`, `fullReset` capabilities.

### Locators

The following location strategies are supported: `id`, `tag name`, `link text`, `partial link text`, `css selector` and `xpath`.

### Contexts

- `ECP` (default) [External Control Protocol](https://github.com/dlenroc/node-roku/blob/main/packages/ecp#readme) is a context that finds elements quickly, but reports incorrect element coordinates and does not see many attributes.

- `ODC` (WIP) [On Device Component](https://github.com/dlenroc/node-roku/blob/main/packages/odc#readme) is a context that sees all attributes and reports coordinates relative to the viewport (can be tunned using `elementResponseAttributes` setting).

### Deep linking

- `input` - Sends a custom event to the launched channel.

  ```js
  driver.url('roku://input?<key>=<value>');
  ```

- `launch` - Launches given channel with specific arguments.

  ```js
  driver.url('roku://launch/:channel_id?<key>=<value>');
  ```

### Channels

In roku `appId` is always `dev` for sideloaded channel or a number for channels installed from store (ex: `12` for Netflix).

```js
driver.queryAppState('dev');
driver.queryAppState('12');
```

> **Note:** most commands only work with SceneGrapth based sideloaded channels.

### Screensaver / Screensaver Settings

Given driver allows testing of [Screensavers](https://developer.roku.com/en-gb/docs/developer-program/media-playback/screensavers.md) via `appium:entryPoint` capability.

- `channel` (default) - Opens channel itself.
- `screensaver` - Opens your channel screen saver.
- `screensaver-settings` - Opens your channel screen saver settings.

> Note: Usually screensavers open on their own and close immediately after any user input is sent, but when entryPoint `screensaver` is used, it runs in the context of the channel, so the input interaction does not close it (`BACK` and `HOME` buttons are an exception).

### Registries / Arguments

In Roku world:

- [Registries](https://developer.roku.com/en-gb/docs/developer-program/getting-started/architecture/file-system.md) are used to store persistent information such as sessions and settings.
- [Input / Launch parameters](https://developer.roku.com/en-gb/docs/developer-program/discovery/implementing-deep-linking.md) are used for deep linking and/or controlling app behavior.

So, knowing this, we can significantly speed up the automation by skipping authorization/configuration steps.

> **Note:** `appium:arguments` and `appium:registry` will contain different values in your case.

```js
const capabilities = {
  ...commonCapabilities,

  // Launch parameters
  'appium:arguments': {
    contentId: 1234,
    mediaType: 'movie',
  },

  // Registry sections Settings
  'appium:registry': {
    account: {
      token: '<user_token>',
    },
  },
};
```

### Additional Commands

Any methods from [node-roku](https://github.com/dlenroc/node-roku/tree/main/packages/roku#readme) can be called using a script in the following format `<component>:<method>`.

The following components are available: [ecp](https://github.com/dlenroc/node-roku/blob/main/packages/ecp#readme), [debugServer](https://github.com/dlenroc/node-roku/blob/main/packages/debug-server#readme), [developerServer](https://github.com/dlenroc/node-roku/blob/main/packages/developer-server#readme), and [odc](https://github.com/dlenroc/node-roku/blob/main/packages/odc#readme).

```js
// without args
const playerState = driver.execute('ecp:queryMediaPlayer');

// with args
driver.execute('ecp:launch', 'dev');
```

### Actions

The following actions types are supported:

- `input` - sends given keys.
- `keyDown`, `keyUp` - presses/releases given key.
- `pointerMove` - focuses the element using arrow buttons.
- `pointerDown`, `pointerUp` - redirects to `keyDown`/`keyUp` with `Select` button.
- `pause` - waits given amounts of milliseconds.

Below are the key codes and their equivalents in the roku remote.

| Code     | Keyboard Key  | Roku Key        |
| -------- | ------------- | --------------- |
| `\uE002` | `Help`        | `Info`          |
| `\ue003` | `Backspace`   | `Backspace`     |
| `\ue006` | `Return`      | `Enter`         |
| `\ue007` | `Enter`       | `Select`        |
| `\ue00b` | `Pause`       | `Play`          |
| `\uE00C` | `Escape`      | `Back`          |
| `\uE00E` | `Page Up`     | `ChannelUp`     |
| `\uE00F` | `Page Down`   | `ChannelDown`   |
| `\ue011` | `Home`        | `Home`          |
| `\ue012` | `Arrow Left`  | `Left`          |
| `\ue013` | `Arrow Up`    | `Up`            |
| `\ue014` | `Arrow Right` | `Right`         |
| `\ue015` | `Arrow Down`  | `Down`          |
| `\uE01A` | `0`           | `InputAV1`      |
| `\uE01B` | `1`           | `InputHDMI1`    |
| `\uE01C` | `2`           | `InputHDMI2`    |
| `\uE01D` | `3`           | `InputHDMI3`    |
| `\uE01E` | `4`           | `InputHDMI4`    |
| `\uE01F` | `5`           | `InputTuner`    |
| `\uE036` | `F6`          | `InstantReplay` |
| `\uE037` | `F7`          | `Rev`           |
| `\uE038` | `F8`          | `Play`          |
| `\uE039` | `F9`          | `Fwd`           |
| `\uE03A` | `F10`         | `VolumeMute`    |
| `\uE03B` | `F11`         | `VolumeDown`    |
| `\uE03C` | `F12`         | `VolumeUp`      |

## Capabilities

If adding a vendor prefix is a problem, [@appium/relaxed-caps-plugin](https://www.npmjs.com/package/@appium/relaxed-caps-plugin) can be used to get rid of them.

### Roku

| Capability          | Required |  Type  | Description                                                                                                                            |
| ------------------- | :------: | :----: | -------------------------------------------------------------------------------------------------------------------------------------- |
| `appium:ip`         |    +     | string | The IP address of the target device                                                                                                    |
| `appium:password`   |    +     | string | Password for the [development environment](https://developer.roku.com/en-gb/docs/developer-program/getting-started/developer-setup.md) |
| `appium:username`   |    -     | string | Username for the [development environment](https://developer.roku.com/en-gb/docs/developer-program/getting-started/developer-setup.md) |
| `appium:context`    |    -     | string | Sets the [context](#contexts) to be used, default `ECP`                                                                                |
| `appium:registry`   |    -     | object | Pre-fills the registry with the specified sections/keys                                                                                |
| `appium:arguments`  |    -     | object | Parameters to be passed to the main method                                                                                             |
| `appium:entryPoint` |    -     | string | Specifies the channel entry point, possible values are `channel`, `screensaver`, `screensaver-settings`                                |

### Appium

| Capability                            | Required |  Type   | Description                                                                                                                     |
| ------------------------------------- | :------: | :-----: | ------------------------------------------------------------------------------------------------------------------------------- |
| `platformName`                        |    +     | string  | Must be `roku`                                                                                                                  |
| `appium:automationName`               |    +     | string  | Must be `roku`                                                                                                                  |
| `appium:deviceName`                   |   +/-    | String  | Helps webdriver clients understand that they are dealing with appium                                                            |
| `appium:app`                          |    +     | string  | The absolute local path or remote http URL to channel                                                                           |
| `appium:noReset`                      |    -     | boolean | Do not stop app, do not clear app data, and do not uninstall app                                                                |
| `appium:fullReset`                    |    -     | boolean | Stop app, clear app data and uninstall app before session starts and after test                                                 |
| `appium:printPageSourceOnFindFailure` |    -     | boolean | When a find operation fails, print the current page source. Defaults to `false`                                                 |
| `appium:newCommandTimeout`            |    -     | number  | How long (in seconds) Appium will wait for a new command from the client before assuming the client quit and ending the session |
| `appium:settings[<key>]`              |    -     |   any   | Update [driver settings](#setting) on session creation                                                                          |

## Settings

| Name                        | Type   | Description                                                                                               |
| --------------------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| `elementResponseAttributes` | string | Comma-separated list of element attribute names that will be available in page source and related actions |

## Commands

The following sections contain supported commands with links to source code and documentation.

> **Note:** command you call from the web driver may have a different name, but under the hood appium will call one of the commands below.

### WebDriver

### WebDriver Commands

| Command                                                | Description                                       |
| ------------------------------------------------------ | ------------------------------------------------- |
| [createSession](src/commands/createSession.ts)         | Create a new session                              |
| [deleteSession](src/commands/deleteSession.ts)         | End the running session                           |
| [setUrl](src/commands/setUrl.ts)                       | Open an deep link                                 |
| [getWindowRect](src/commands/getWindowRect.ts)         | Get the rect of the viewport                      |
| [active](src/commands/active.ts)                       | Gets the focused element                          |
| [findElement](src/commands/findElOrEls.ts)             | Search for an element                             |
| [findElements](src/commands/findElOrEls.ts)            | Search for multiple elements                      |
| [findElementFromElement](src/commands/findElOrEls.ts)  | Search for an element in parent element           |
| [findElementsFromElement](src/commands/findElOrEls.ts) | Search multiple elements in parent element        |
| [elementSelected](src/commands/elementSelected.ts)     | Determine if element is focused                   |
| [getAttribute](src/commands/getProperty.ts)            | Get the value of an element's attribute           |
| [getProperty](src/commands/getProperty.ts)             | Get the value of an element's attribute           |
| [getText](src/commands/getText.ts)                     | Returns visible text for element                  |
| [getName](src/commands/getName.ts)                     | Get an element's tag name                         |
| [getElementRect](src/commands/getElementRect.ts)       | Gets dimensions and coordinates of an element     |
| [elementEnabled](src/commands/elementDisplayed.ts)     | Determine if an element is currently enabled      |
| [elementDisplayed](src/commands/elementDisplayed.ts)   | Determine if an element is currently displayed    |
| [click](src/commands/click.ts)                         | Focuses the element and then clicks `Select`      |
| [clear](src/commands/clear.ts)                         | Clear an element's value                          |
| [setValue](src/commands/setValue.ts)                   | Send a sequence of key strokes to an element      |
| [getPageSource](src/commands/getPageSource.ts)         | Get the XML representation of the current UI      |
| [execute](src/commands/execute.ts)                     | Execute a command                                 |
| [performActions](src/commands/performActions.ts)       | Perform a chain or multiple chains of actions     |
| [releaseActions](src/commands/releaseActions.ts)       | Release all the keys that are currently depressed |
| [isAlertShown](src/commands/isAlertShown.ts)           | Check if dialog is open                           |
| [postDismissAlert](src/commands/postDismissAlert.ts)   | Dismiss dialog using `Back` key                   |
| [postAcceptAlert](src/commands/postAcceptAlert.ts)     | Accept dialog using first button                  |
| [getAlertText](src/commands/getAlertText.ts)           | Get dialog text                                   |
| [setAlertText](src/commands/setAlertText.ts)           | Fill dialog with text                             |
| [getScreenshot](src/commands/getScreenshot.ts)         | Take a screenshot of the current viewport         |

### Appium Commands

| Command                                                | Description                                                       |
| ------------------------------------------------------ | ----------------------------------------------------------------- |
| [unlock](src/commands/unlock.ts)                       | Stop screensaver                                                  |
| [isLocked](src/commands/isLocked.ts)                   | Check if screensaver is displayed                                 |
| [installApp](src/commands/installApp.ts)               | Install the given app onto the device                             |
| [activateApp](src/commands/activateApp.ts)             | Activate the given app onto the device                            |
| [removeApp](src/commands/removeApp.ts)                 | Remove an app from the device                                     |
| [terminateApp](src/commands/terminateApp.ts)           | Terminate the given app on the device                             |
| [isAppInstalled](src/commands/isAppInstalled.ts)       | Check whether the specified app is installed on the device        |
| [queryAppState](src/commands/queryAppState.ts)         | Get the given app status on the device                            |
| [hideKeyboard](src/commands/hideKeyboard.ts)           | Hide keyboard                                                     |
| [isKeyboardShown](src/commands/isKeyboardShown.ts)     | Whether or not the keyboard is shown                              |
| [pushFile](src/commands/pushFile.ts)                   | Place a file onto the device in a particular place                |
| [pullFile](src/commands/pullFile.ts)                   | Retrieve a file from the device's file system                     |
| [pullFolder](src/commands/pullFolder.ts)               | Retrieve a folder from the device's file system                   |
| [launchApp](src/commands/launchApp.ts)                 | Launch the app-under-test on the device                           |
| [closeApp](src/commands/closeApp.ts)                   | Close an app on device                                            |
| [reset](src/commands/reset.ts)                         | Reset the currently running app for this session                  |
| [background](src/commands/background.ts)               | Send the currently running app for this session to the background |
| [setValueImmediate](src/commands/replaceValue.ts)      | Replace the value of the given element                            |
| [replaceValue](src/commands/replaceValue.ts)           | Replace the value of the given element                            |
| [updateSettings](src/commands/updateSettings.ts)       | Update settings                                                   |
| [getCurrentContext](src/commands/getCurrentContext.ts) | Get current context                                               |
| [setContext](src/commands/setContext.ts)               | Set context                                                       |
| [getContexts](src/commands/getContexts.ts)             | Get available contexts                                            |
