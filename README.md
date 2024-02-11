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

### Locators

The following location strategies are supported: `tag name`, `link text`, `partial link text`, `css selector` and `xpath`.

### Contexts

- `ECP` (default) [External Control Protocol](https://github.com/dlenroc/node-roku/blob/main/packages/ecp#readme) is a context that finds elements quickly, but does not see many attributes.

- `ODC` (WIP) [On Device Component](https://github.com/dlenroc/node-roku/blob/main/packages/odc#readme) is a context that finds elements slower, but see all attributes. (can be tunned using `elementResponseAttributes` setting).

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

### Actions

The following action types are supported:

- `keyDown`, `keyUp` - presses/releases given key.
- `pointerMove` - focuses the element using arrow buttons.
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

### Roku Capabilities

| Capability          | Required |  Type  | Description                                                                                                                            |
| ------------------- | :------: | :----: | -------------------------------------------------------------------------------------------------------------------------------------- |
| `appium:ip`         |    +     | string | The IP address of the target device                                                                                                    |
| `appium:password`   |    +     | string | Password for the [development environment](https://developer.roku.com/en-gb/docs/developer-program/getting-started/developer-setup.md) |
| `appium:username`   |    -     | string | Username for the [development environment](https://developer.roku.com/en-gb/docs/developer-program/getting-started/developer-setup.md) |
| `appium:context`    |    -     | string | Sets the [context](#contexts) to be used, default `ECP`                                                                                |
| `appium:registry`   |    -     | object | Pre-fills the registry with the specified sections/keys                                                                                |
| `appium:arguments`  |    -     | object | Parameters to be passed to the main method                                                                                             |
| `appium:entryPoint` |    -     | string | Specifies the channel entry point, possible values are `channel`, `screensaver`, `screensaver-settings`                                |

### Appium Capabilities

| Capability                            | Required |  Type   | Description                                                                                                                     |
| ------------------------------------- | :------: | :-----: | ------------------------------------------------------------------------------------------------------------------------------- |
| `platformName`                        |    +     | string  | Must be `roku`                                                                                                                  |
| `appium:automationName`               |    +     | string  | Must be `roku`                                                                                                                  |
| `appium:deviceName`                   |   +/-    | String  | Helps webdriver clients understand that they are dealing with appium                                                            |
| `appium:app`                          |    -     | string  | The absolute local path or remote http URL to channel                                                                           |
| `appium:noReset`                      |    -     | boolean | Do not stop app, do not clear app data, and do not uninstall app                                                                |
| `appium:printPageSourceOnFindFailure` |    -     | boolean | When a find operation fails, print the current page source. Defaults to `false`                                                 |
| `appium:newCommandTimeout`            |    -     | number  | How long (in seconds) Appium will wait for a new command from the client before assuming the client quit and ending the session |
| `appium:settings[<key>]`              |    -     |   any   | Update [driver settings](#settings) on session creation                                                                         |
| `appiun:shouldTerminateApp`           |    -     | boolean | If `true`, the channel will be closed after the session is finished. Defaults to `false`                                        |

## Settings

| Name                        | Type   | Description                                                                                               |
| --------------------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| `elementResponseAttributes` | string | Comma-separated list of element attribute names that will be available in page source and related actions |

## Supported Commands

The supported commands are listed in the sections below but note that they may have a different name in the client you are using

Example: calling the `setContext` command

```typescript
// Java
driver.context('ECP');

// WebdriverIO
driver.switchContext('ECP');
```

### WebDriver Commands

| Command                                                | Description                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [createSession](src/commands/createSession.ts)         | Create a new session                                                                                                                                                                                                                                                                                                                      |
| [deleteSession](src/commands/deleteSession.ts)         | End the running session                                                                                                                                                                                                                                                                                                                   |
| [setUrl](src/commands/setUrl.ts)                       | Open a deep link                                                                                                                                                                                                                                                                                                                          |
| [active](src/commands/active.ts)                       | Get the currently focused element                                                                                                                                                                                                                                                                                                         |
| [findElement](src/commands/findElOrEls.ts)             | Search for an element                                                                                                                                                                                                                                                                                                                     |
| [findElements](src/commands/findElOrEls.ts)            | Search for multiple elements                                                                                                                                                                                                                                                                                                              |
| [findElementFromElement](src/commands/findElOrEls.ts)  | Search for an element in parent element                                                                                                                                                                                                                                                                                                   |
| [findElementsFromElement](src/commands/findElOrEls.ts) | Search multiple elements in parent element                                                                                                                                                                                                                                                                                                |
| [getAttribute](src/commands/getAttribute.ts)           | Get the value of an attribute from a given element                                                                                                                                                                                                                                                                                        |
| [getProperty](src/commands/getProperty.ts)             | Get the value of an property from a given element <ul><li>`isFocused` - returns `true` if the element is focused.</li><li>`isInFocusChain` - returns `true` if the element or any of its descendants are focused</li><li>`isInFocusHierarchy` - returns `true` if the element or any of its ancestors or descendants is focused</li></ul> |
| [getText](src/commands/getText.ts)                     | Get the visible text of a given element                                                                                                                                                                                                                                                                                                   |
| [getName](src/commands/getName.ts)                     | Get the tag name of given element                                                                                                                                                                                                                                                                                                         |
| [getElementRect](src/commands/getElementRect.ts)       | Get the position and size of the given element                                                                                                                                                                                                                                                                                            |
| [elementDisplayed](src/commands/elementDisplayed.ts)   | Check if the element is displayed                                                                                                                                                                                                                                                                                                         |
| [click](src/commands/click.ts)                         | Presses the `Select` button on given element                                                                                                                                                                                                                                                                                              |
| [clear](src/commands/clear.ts)                         | Clears the content of the given element                                                                                                                                                                                                                                                                                                   |
| [setValue](src/commands/setValue.ts)                   | Send a sequence of keystrokes to an element                                                                                                                                                                                                                                                                                               |
| [getPageSource](src/commands/getPageSource.ts)         | Get the XML representation of the current UI                                                                                                                                                                                                                                                                                              |
| [execute](src/commands/execute.ts)                     | Execute an roku command                                                                                                                                                                                                                                                                                                                   |
| [performActions](src/commands/performActions.ts)       | Performs a chain of actions                                                                                                                                                                                                                                                                                                               |
| [releaseActions](src/commands/releaseActions.ts)       | Release depressed key                                                                                                                                                                                                                                                                                                                     |
| [getScreenshot](src/commands/getScreenshot.ts)         | Take a screenshot                                                                                                                                                                                                                                                                                                                         |

### Appium Commands

| Command                                                | Description                                |
| ------------------------------------------------------ | ------------------------------------------ |
| [installApp](src/commands/installApp.ts)               | Install the channel if it is not installed |
| [activateApp](src/commands/activateApp.ts)             | Launch the given channel                   |
| [removeApp](src/commands/removeApp.ts)                 | Remove the given channel from the device   |
| [isAppInstalled](src/commands/isAppInstalled.ts)       | Checks if a channel is installed           |
| [queryAppState](src/commands/queryAppState.ts)         | Queries the channel state                  |
| [pushFile](src/commands/pushFile.ts)                   | Push a file to the device                  |
| [pullFile](src/commands/pullFile.ts)                   | Pull a file from the device                |
| [pullFolder](src/commands/pullFolder.ts)               | Pull a folder from the device              |
| [updateSettings](src/commands/updateSetting.ts)        | Updates current test session settings      |
| [getCurrentContext](src/commands/getCurrentContext.ts) | Get the name of the current context        |
| [setContext](src/commands/setContext.ts)               | Switches to the given context              |
| [getContexts](src/commands/getContexts.ts)             | Get the names of available contexts        |

### Roku Commands

In addition to the standard apium commands, Roku has several additional features that go beyond the appium protocol, so they are available through a javascript executor and a script in the following format `<component>:<command>`

The following components are available: [ecp](https://npmjs.com/package/@dlenroc/roku-ecp/v/2.0.0), [debugServer](https://www.npmjs.com/package/@dlenroc/roku-debug-server/v/2.0.0), [developerServer](https://www.npmjs.com/package/@dlenroc/roku-developer-server/v/2.0.0), and [odc](https://www.npmjs.com/package/@dlenroc/roku-odc/v/2.0.1)

Example:

```js
// with args
driver.execute('ecp:launch', [{ appId: 'dev', params: {} }]);

// without args
const playerState = driver.execute('ecp:queryMediaPlayer');
playerState.duration;
```
