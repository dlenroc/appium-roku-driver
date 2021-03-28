# Appium Roku Driver · [![NPM Version](https://img.shields.io/npm/v/@dlenroc/appium-roku-driver?cacheSeconds=86400)](https://www.npmjs.com/package/@dlenroc/appium-roku-driver) ![Node.js Version](https://img.shields.io/node/v/@dlenroc/appium-roku-driver) [![Node.js CI](https://github.com/dlenroc/appium-roku-driver/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/dlenroc/appium-roku-driver/actions/workflows/nodejs.yml)

Roku Driver is a WebDriver that allows to test channels using any compatible client.

## Installation

Install `Appium 2` (if not installed).

```sh
npm install -g appium@next
```

Install `roku` driver.

```sh
appium driver install --source npm @dlenroc/appium-roku-driver
```

Run Appium.

```sh
appium

# Output:
#   Appium REST http interface listener started on 0.0.0.0:4723
#   Available drivers:
#     - roku@<version> (automationName 'Roku')
```

## Documentation

Thanks to the [Appium](https://github.com/appium/appium) and [WebDriver](https://www.w3.org/TR/webdriver/) protocol, this driver works just like other similar drivers, but there are still a couple of things that are worth mentioning.

### Initialization

Like other drivers, roku-driver by default uses the so-called `fast reset` algorithm, in which registries are cleared before each test, and a full reinstallation occurs only if the name or version of the channel is different from the one already installed.

Can be tunned using `noReset`, `fullReset` capabilities.

### Locators

The following location strategies are supported: `id`, `tag name`, `css selector` and `xpath`.

### Deep linking

- `input` - Sends custom events to the current application.

  ```js
  driver.url('roku://input?<key>=<value>');
  ```

- `launch` - Launches given channel with specific arguments.

  ```js
  driver.url('roku://launch/:channel_id?<key>=<value>');
  ```

### Contexts

- `ECP` (default) [External Control Protocol](https://github.com/dlenroc/node-roku#ecp) is a context which finds elements quickly, but reports incorrect element coordinates and does not see many attributes.

- `ODC` (WIP) [On Device Component](https://github.com/dlenroc/node-roku#odc) is a context which finds elements more slowly, but sees all attributes (with primitive types) and reports coordinates relative to the viewport.

### Channels

In roku `appId` is always `dev` for sideloaded channel or a number for channels installed from store (ex: `12` for Netflix).

```js
driver.queryAppState('dev');
driver.queryAppState('12');
```

Note that most commands only work with SceneGrapth based sideloaded channel.

### State manipulating

If the channel logic depends on the values in the registry, then we can manipulate its state via the settings api.

```js
// Clear section
driver.updateSettings({
  section: null,
});

// Remove a key from section
driver.updateSettings({
  section: {
    key: null,
  },
});

// Add/Update a key value from section
driver.updateSettings({
  section: {
    key: 'value',
  },
});
```

### Additional Commands

Any methods from [node-roku](https://github.com/dlenroc/node-roku) can be called using a script in the following format `<component>:<method>`.

The following components are available: [ecp](https://github.com/dlenroc/node-roku#ecp), [debugServer](https://github.com/dlenroc/node-roku#debugserver), [developerServer](https://github.com/dlenroc/node-roku#developerserver), and [odc](https://github.com/dlenroc/node-roku#odc).

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

## Roku

| Capability        | Required |  Type  | Description                                                                                                                            |
| ----------------- | :------: | :----: | -------------------------------------------------------------------------------------------------------------------------------------- |
| `appium:ip`       |    +     | string | The IP address of the target device                                                                                                    |
| `appium:password` |    +     | string | Password for the [development environment](https://developer.roku.com/en-gb/docs/developer-program/getting-started/developer-setup.md) |
| `appium:username` |    -     | string | Username for the [development environment](https://developer.roku.com/en-gb/docs/developer-program/getting-started/developer-setup.md) |

### Appium

| Capability                            | Required |  Type   | Description                                                                                                                     |
| ------------------------------------- | :------: | :-----: | ------------------------------------------------------------------------------------------------------------------------------- |
| `appium:platformName`                 |    +     | string  | Must be `roku`                                                                                                                  |
| `appium:automationName`               |    +     | string  | Must be `roku`                                                                                                                  |
| `appium:app`                          |    +     | string  | The absolute local path to channel.                                                                                             |
| `appium:noReset`                      |    -     | boolean | Do not stop app, do not clear app data, and do not uninstall app.                                                               |
| `appium:fullReset`                    |    -     | boolean | Stop app, clear app data and uninstall app before session starts and after test                                                 |
| `appium:printPageSourceOnFindFailure` |    -     | boolean | When a find operation fails, print the current page source. Defaults to `false`.                                                |
| `appium:newCommandTimeout`            |    -     | number  | How long (in seconds) Appium will wait for a new command from the client before assuming the client quit and ending the session |

## Commands

### App

| Command                                              | Ref                                                                     | Description                                                       |
| ---------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [activateApp](src/commands/app/activateApp.ts)       | [here](https://appium.io/docs/en/commands/device/app/activate-app/)     | Activate the given app onto the device                            |
| [background](src/commands/app/background.ts)         | [here](https://appium.io/docs/en/commands/device/app/background-app/)   | Send the currently running app for this session to the background |
| [closeApp](src/commands/app/closeApp.ts)             | [here](https://appium.io/docs/en/commands/device/app/close-app/)        | Close an app on device                                            |
| [installApp](src/commands/app/installApp.ts)         | [here](https://appium.io/docs/en/commands/device/app/install-app/)      | Install the given app onto the device                             |
| [isAppInstalled](src/commands/app/isAppInstalled.ts) | [here](https://appium.io/docs/en/commands/device/app/is-app-installed/) | Check whether the specified app is installed on the device        |
| [launchApp](src/commands/app/launchApp.ts)           | [here](https://appium.io/docs/en/commands/device/app/launch-app/)       | Launch the app-under-test on the device                           |
| [queryAppState](src/commands/app/queryAppState.ts)   | [here](https://appium.io/docs/en/commands/device/app/app-state/)        | Get the given app status on the device                            |
| [removeApp](src/commands/app/removeApp.ts)           | [here](https://appium.io/docs/en/commands/device/app/remove-app/)       | Remove an app from the device                                     |
| [reset](src/commands/app/reset.ts)                   | [here](https://appium.io/docs/en/commands/device/app/reset-app/)        | Reset the currently running app for this session                  |
| [terminateApp](src/commands/app/terminateApp.ts)     | [here](https://appium.io/docs/en/commands/device/app/terminate-app/)    | Terminate the given app on the device                             |

### Context

| Command                                                        | Ref                                                              | Description            |
| -------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------- |
| [getContexts](src/commands/context/getContexts.ts)             | [here](https://appium.io/docs/en/commands/context/get-contexts/) | Get available contexts |
| [getCurrentContext](src/commands/context/getCurrentContext.ts) | [here](https://appium.io/docs/en/commands/context/get-context/)  | Get current context    |
| [setContext](src/commands/context/setContext.ts)               | [here](https://appium.io/docs/en/commands/context/set-context/)  | Set context            |

### Events

| Command                                                                                                                                           | Ref                                                                  | Description                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------- |
| [getLogEvents](https://github.com/appium/appium-base-driver/blob/d44b4eb7e1d6e7aeeb045a7885bae790b5f19fba/lib/basedriver/commands/event.js#L23)   | [here](http://appium.io/docs/en/commands/session/events/get-events/) | Get events stored in appium server |
| [logCustomEvent](https://github.com/appium/appium-base-driver/blob/d44b4eb7e1d6e7aeeb045a7885bae790b5f19fba/lib/basedriver/commands/event.js#L12) | [here](http://appium.io/docs/en/commands/session/events/log-event/)  | Store a custom event               |

### Element

| Command                                                        | Ref                                                                                | Description                                    |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------- |
| [active](src/commands/element/active.ts)                       | [here](http://appium.io/docs/en/commands/element/other/active/#get-active-element) | Gets the focused element                       |
| [clear](src/commands/element/clear.ts)                         | [here](http://appium.io/docs/en/commands/element/actions/clear/)                   | Clear an element's value                       |
| [click](src/commands/element/click.ts)                         | [here](http://appium.io/docs/en/commands/element/actions/click/)                   | Focuses the element and then clicks `Select`   |
| [elementDisplayed](src/commands/element/elementDisplayed.ts)   | [here](http://appium.io/docs/en/commands/element/attributes/displayed/)            | Determine if an element is currently displayed |
| [elementEnabled](src/commands/element/elementEnabled.ts)       | [here](http://appium.io/docs/en/commands/element/attributes/enabled/)              | Determine if an element is currently enabled   |
| [elementSelected](src/commands/element/elementSelected.ts)     | [here](http://appium.io/docs/en/commands/element/attributes/selected/)             | Determine if element is focused                |
| [findElement](src/commands/element/findElOrEls.ts)             | [here](http://appium.io/docs/en/commands/element/find-element/)                    | Search for an element                          |
| [findElementFromElement](src/commands/element/findElOrEls.ts)  | [here](http://appium.io/docs/en/commands/element/find-element/)                    | Search for an element in parent element        |
| [findElements](src/commands/element/findElOrEls.ts)            | [here](http://appium.io/docs/en/commands/element/find-element/)                    | Search for multiple elements                   |
| [findElementsFromElement](src/commands/element/findElOrEls.ts) | [here](http://appium.io/docs/en/commands/element/find-element/)                    | Search multiple elements in parent element     |
| [getAttribute](src/commands/element/getAttribute.ts)           | [here](http://appium.io/docs/en/commands/element/attributes/attribute/)            | Get the value of an element's attribute        |
| [getElementRect](src/commands/element/getElementRect.ts)       | [here](http://appium.io/docs/en/commands/element/attributes/rect/)                 | Gets dimensions and coordinates of an element  |
| [getLocation](src/commands/element/getLocation.ts)             | [here](http://appium.io/docs/en/commands/element/attributes/location/)             | Determine an element's location on the screen  |
| [getName](src/commands/element/getName.ts)                     | [here](http://appium.io/docs/en/commands/element/attributes/name/)                 | Get an element's tag name                      |
| [getSize](src/commands/element/getSize.ts)                     | [here](http://appium.io/docs/en/commands/element/attributes/size/)                 | Determine an element's size in pixels          |
| [getText](src/commands/element/getText.ts)                     | [here](http://appium.io/docs/en/commands/element/attributes/text/)                 | Returns visible text for element               |
| [replaceValue](src/commands/element/replaceValue.ts)           | -                                                                                  | Replace the value of the given element         |
| [setValue](src/commands/element/setValue.ts)                   | [here](http://appium.io/docs/en/commands/element/actions/send-keys/)               | Send a sequence of key strokes to an element   |
| [setValueImmediate](src/commands/element/setValueImmediate.ts) | -                                                                                  | Replace the value of the given element         |
| [submit](src/commands/element/submit.ts)                       | [here](http://appium.io/docs/en/commands/element/other/submit/)                    | Submit entered text                            |

### Interaction

| Command                                                                                                                                                  | Ref                                                                 | Description                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------- |
| [execute](src/commands/interaction/execute.ts)                                                                                                           | [here](http://appium.io/docs/en/commands/mobile-command/)           | Execute a command                                    |
| [executeDriverScript](https://github.com/appium/appium-base-driver/blob/d44b4eb7e1d6e7aeeb045a7885bae790b5f19fba/lib/basedriver/commands/execute.js#L26) | [here](http://appium.io/docs/en/commands/session/execute-driver/)   | Run a WebdriverIO script against the current session |
| [performActions](src/commands/interaction/performActions.ts)                                                                                             | [here](http://appium.io/docs/en/commands/interactions/actions/)     | Perform a chain or multiple chains of actions        |
| [setUrl](src/commands/interaction/setUrl.ts)                                                                                                             | [here](http://appium.io/docs/en/commands/web/navigation/go-to-url/) | Open an deep link                                    |

### Keyboard

| Command                                                     | Ref                                                                      | Description                          |
| ----------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------ |
| [hideKeyboard](src/commands/keyboard/hideKeyboard.ts)       | [here](http://appium.io/docs/en/commands/device/keys/hide-keyboard/)     | Hide keyboard                        |
| [isKeyboardShown](src/commands/keyboard/isKeyboardShown.ts) | [here](http://appium.io/docs/en/commands/device/keys/is-keyboard-shown/) | Whether or not the keyboard is shown |

### Registry

| Command                                                                                                                                             | Ref                                                                                                                 | Description         |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------- |
| [getSettings](https://github.com/appium/appium-base-driver/blob/d44b4eb7e1d6e7aeeb045a7885bae790b5f19fba/lib/basedriver/commands/settings.js#L12)   | [here](https://github.com/appium/appium/blob/master/docs/en/advanced-concepts/settings.md#retrieve-device-settings) | Retrieve registries |
| [updateSettings](https://github.com/appium/appium-base-driver/blob/d44b4eb7e1d6e7aeeb045a7885bae790b5f19fba/lib/basedriver/commands/settings.js#L5) | [here](https://github.com/appium/appium/blob/master/docs/en/advanced-concepts/settings.md#update-device-settings)   | Update registries   |

### Logs

| Command                                                                                                                                      | Ref                                                                   | Description                      |
| -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------- |
| [getLog](https://github.com/appium/appium-base-driver/blob/5521888b0fe3496ce21238cece05c6bb16244f93/lib/basedriver/commands/log.js#L23)      | [here](http://appium.io/docs/en/commands/session/logs/get-log/)       | Get the log for a given log type |
| [getLogTypes](https://github.com/appium/appium-base-driver/blob/5521888b0fe3496ce21238cece05c6bb16244f93/lib/basedriver/commands/log.js#L18) | [here](http://appium.io/docs/en/commands/session/logs/get-log-types/) | Get available log types          |

### Screen

| Command                                               | Ref                                                                   | Description                                  |
| ----------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------- |
| [getPageSource](src/commands/screen/getPageSource.ts) | [here](http://appium.io/docs/en/commands/session/source/)             | Get the XML representation of the current UI |
| [getScreenshot](src/commands/screen/getScreenshot.ts) | [here](http://appium.io/docs/en/commands/session/screenshot/)         | Take a screenshot of the current viewport    |
| [getWindowRect](src/commands/screen/getWindowRect.ts) | [here](http://appium.io/docs/en/commands/web/window/get-window-size/) | Get the rect of the viewport                 |
| [getWindowSize](src/commands/screen/getWindowSize.ts) | [here](http://appium.io/docs/en/commands/web/window/get-window-size/) | Get the size of the viewport                 |

### Screensaver

| Command                                          | Ref                                                                      | Description                       |
| ------------------------------------------------ | ------------------------------------------------------------------------ | --------------------------------- |
| [isLocked](src/commands/screensaver/isLocked.ts) | [here](http://appium.io/docs/en/commands/device/interactions/is-locked/) | Check if screensaver is displayed |
| [unlock](src/commands/screensaver/unlock.ts)     | [here](http://appium.io/docs/en/commands/device/interactions/unlock/)    | Stop screensaver                  |

### Session

| Command                                                                                                                                          | Ref                                                                                                                                 | Description                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| [createSession](src/commands/session/createSession.ts)                                                                                           | [here](http://appium.io/docs/en/commands/session/create/)                                                                           | Create a new session                               |
| [deleteSession](src/commands/session/deleteSession.ts)                                                                                           | [here](http://appium.io/docs/en/commands/session/delete/)                                                                           | End the running session                            |
| [getSession](https://github.com/appium/appium-base-driver/blob/d44b4eb7e1d6e7aeeb045a7885bae790b5f19fba/lib/basedriver/commands/session.js#L95)  | [here](http://appium.io/docs/en/commands/session/get/)                                                                              | Retrieve the capabilities of the specified session |
| [getSessions](https://github.com/appium/appium-base-driver/blob/d44b4eb7e1d6e7aeeb045a7885bae790b5f19fba/lib/basedriver/commands/session.js#L82) | [here](https://github.com/appium/appium-base-driver/blob/5521888b0fe3496ce21238cece05c6bb16244f93/docs/mjsonwp/protocol-methods.md) | Retrieve a list of currently active sessions       |

### Timeouts

| Command                                                                                                                                           | Ref                                                                       | Description                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [getTimeouts](https://github.com/appium/appium-base-driver/blob/d44b4eb7e1d6e7aeeb045a7885bae790b5f19fba/lib/basedriver/commands/timeout.js#L47)  | [here](https://www.w3.org/TR/webdriver/#get-timeouts)                     | Get timeouts                                                              |
| [implicitWait](https://github.com/appium/appium-base-driver/blob/d44b4eb7e1d6e7aeeb045a7885bae790b5f19fba/lib/basedriver/commands/timeout.js#L63) | [here](http://appium.io/docs/en/commands/session/timeouts/implicit-wait/) | Set the amount of time the driver should wait when searching for elements |
| [timeouts](https://github.com/appium/appium-base-driver/blob/d44b4eb7e1d6e7aeeb045a7885bae790b5f19fba/lib/basedriver/commands/timeout.js#L12)     | [here](http://appium.io/docs/en/commands/session/timeouts/timeouts/)      | Set `command`/`implicit` timeout                                          |
