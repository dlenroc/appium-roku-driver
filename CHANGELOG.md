# Changelog

## [0.11.2](https://github.com/dlenroc/appium-roku-driver/compare/v0.11.1...v0.11.2) (2024-03-31)


### Features

* stop pending commands after session deletion ([cc1380f](https://github.com/dlenroc/appium-roku-driver/commit/cc1380fa48a74828a71c0869fd7738d818a79cd5))


### Bug Fixes

* release pressed key ([a887636](https://github.com/dlenroc/appium-roku-driver/commit/a88763609fbe2625466f35d797f5652d2857511a))

## [0.11.1](https://github.com/dlenroc/appium-roku-driver/compare/v0.11.0...v0.11.1) (2024-02-11)


### Bug Fixes

* handle `inheritParentTransform` attribute ([7662ae9](https://github.com/dlenroc/appium-roku-driver/commit/7662ae9c6ed5022b266801169d232c36c35307ed))

## [0.11.0](https://github.com/dlenroc/appium-roku-driver/compare/v0.10.1...v0.11.0) (2024-01-27)


### Features

* added `appiun:shouldTerminateApp` capability support ([549c6e5](https://github.com/dlenroc/appium-roku-driver/commit/549c6e53b9a2612ee6567abc00e0f8148aaf5b2d))
* support for `isFocused` in `getProperty` command ([549c6e5](https://github.com/dlenroc/appium-roku-driver/commit/549c6e53b9a2612ee6567abc00e0f8148aaf5b2d))
* support for `isInFocusChain` in `getProperty` command ([549c6e5](https://github.com/dlenroc/appium-roku-driver/commit/549c6e53b9a2612ee6567abc00e0f8148aaf5b2d))
* support for `isInFocusHierarchy` in `getProperty` command ([549c6e5](https://github.com/dlenroc/appium-roku-driver/commit/549c6e53b9a2612ee6567abc00e0f8148aaf5b2d))
* switched to roku sdk v2.0 ([549c6e5](https://github.com/dlenroc/appium-roku-driver/commit/549c6e53b9a2612ee6567abc00e0f8148aaf5b2d))


### Bug Fixes

* detection of focused element that follow after dynamic keyboard ([549c6e5](https://github.com/dlenroc/appium-roku-driver/commit/549c6e53b9a2612ee6567abc00e0f8148aaf5b2d))
* drop `libxmljs2` usage in favor of `@xmldom/xmldom` ([549c6e5](https://github.com/dlenroc/appium-roku-driver/commit/549c6e53b9a2612ee6567abc00e0f8148aaf5b2d))
* interpret `@id` from XPath like either `id`, `uiElementId`, or `name` ([549c6e5](https://github.com/dlenroc/appium-roku-driver/commit/549c6e53b9a2612ee6567abc00e0f8148aaf5b2d))
* make `setValue` and `clear` commands simpler but more reliable ([549c6e5](https://github.com/dlenroc/appium-roku-driver/commit/549c6e53b9a2612ee6567abc00e0f8148aaf5b2d))
* removed `pointerDown` and `pointerUp` actions in favor of key actions ([549c6e5](https://github.com/dlenroc/appium-roku-driver/commit/549c6e53b9a2612ee6567abc00e0f8148aaf5b2d))
* removed commands deprecated by Appium and W3C specs ([549c6e5](https://github.com/dlenroc/appium-roku-driver/commit/549c6e53b9a2612ee6567abc00e0f8148aaf5b2d))
* removed misleading commands/capabilities ([549c6e5](https://github.com/dlenroc/appium-roku-driver/commit/549c6e53b9a2612ee6567abc00e0f8148aaf5b2d))
* removed non-webdriver locator strategy `id` ([549c6e5](https://github.com/dlenroc/appium-roku-driver/commit/549c6e53b9a2612ee6567abc00e0f8148aaf5b2d))
* speeding up `ODC` context by loading only the required attributes ([549c6e5](https://github.com/dlenroc/appium-roku-driver/commit/549c6e53b9a2612ee6567abc00e0f8148aaf5b2d))
* updated `activateApp` to restart application if it’s already activated ([549c6e5](https://github.com/dlenroc/appium-roku-driver/commit/549c6e53b9a2612ee6567abc00e0f8148aaf5b2d))
* updated `getScreenshot` to throw error if screenshot taking failed ([549c6e5](https://github.com/dlenroc/appium-roku-driver/commit/549c6e53b9a2612ee6567abc00e0f8148aaf5b2d))


### Code Refactoring

* rewritten in JavaScript and minimized misleading commands ([549c6e5](https://github.com/dlenroc/appium-roku-driver/commit/549c6e53b9a2612ee6567abc00e0f8148aaf5b2d))

## [0.10.1](https://github.com/dlenroc/appium-roku-driver/compare/v0.10.0...v0.10.1) (2024-01-12)


### Bug Fixes

* `setValue` and `replaceValue` for custom input elements ([00e4a70](https://github.com/dlenroc/appium-roku-driver/commit/00e4a704b59cbc15cecc5044a8d0890d38805516))

## [0.10.0](https://github.com/dlenroc/appium-roku-driver/compare/v0.9.1...v0.10.0) (2023-12-23)


### Features

* added windows support ([fb0473e](https://github.com/dlenroc/appium-roku-driver/commit/fb0473e01dc3d02068ca25450ea6c4054d1567d3))


### Bug Fixes

* align `active` command behavior with `Roku WebDriver` ([fb0473e](https://github.com/dlenroc/appium-roku-driver/commit/fb0473e01dc3d02068ca25450ea6c4054d1567d3))
* app state clearing/setting when `fullReset` capability is set ([fb0473e](https://github.com/dlenroc/appium-roku-driver/commit/fb0473e01dc3d02068ca25450ea6c4054d1567d3))
* remove unnecessary XML parsing in `getPageSource` command ([fb0473e](https://github.com/dlenroc/appium-roku-driver/commit/fb0473e01dc3d02068ca25450ea6c4054d1567d3))
* stop roku clients after session deleting ([fb0473e](https://github.com/dlenroc/appium-roku-driver/commit/fb0473e01dc3d02068ca25450ea6c4054d1567d3))


### Code Refactoring

* switch to ESM ([fb0473e](https://github.com/dlenroc/appium-roku-driver/commit/fb0473e01dc3d02068ca25450ea6c4054d1567d3))

## [0.9.1](https://github.com/dlenroc/appium-roku-driver/compare/v0.9.0...v0.9.1) (2023-11-14)


### Features

* make `app` capability optional ([6a67b08](https://github.com/dlenroc/appium-roku-driver/commit/6a67b08f07402b0b5dd3e888afc2b27d0df53cc1))

## [0.9.0](https://github.com/dlenroc/appium-roku-driver/compare/v0.8.5...v0.9.0) (2023-11-04)


### ⚠ BREAKING CHANGES

* nodejs 18, 19, 20 support via `libxmljs2@v0.32.0`

### Bug Fixes

* `hideKeyboard`, `removeApp` and `terminateApp` return type ([9e0852c](https://github.com/dlenroc/appium-roku-driver/commit/9e0852c45c6256e4a36beef945cad67c6e1ab05b))
* compatibility with `appium@2.2.1` ([9e0852c](https://github.com/dlenroc/appium-roku-driver/commit/9e0852c45c6256e4a36beef945cad67c6e1ab05b))
* nodejs 18, 19, 20 support via `libxmljs2@v0.32.0` ([9e0852c](https://github.com/dlenroc/appium-roku-driver/commit/9e0852c45c6256e4a36beef945cad67c6e1ab05b))

## [0.8.5](https://github.com/dlenroc/appium-roku-driver/compare/v0.8.4...v0.8.5) (2023-11-03)


### Bug Fixes

* `12.5.0` firmware support ([0379e15](https://github.com/dlenroc/appium-roku-driver/commit/0379e15c07220c227142d8867683eccdcc6b76f8))

## [0.8.4](https://github.com/dlenroc/appium-roku-driver/compare/v0.8.3...v0.8.4) (2023-09-16)


### Bug Fixes

* odc injection ([bd84560](https://github.com/dlenroc/appium-roku-driver/commit/bd84560763eed64b35bb9edb31042cb3f074aa50))

## [0.8.3](https://github.com/dlenroc/appium-roku-driver/compare/v0.8.2...v0.8.3) (2022-06-06)


### Bug Fixes

* handle `extends` attribute ([f0c97e3](https://github.com/dlenroc/appium-roku-driver/commit/f0c97e35ddea0d3dd6b5f184bfa2eb949b7b24eb))

### [0.8.2](https://github.com/dlenroc/appium-roku-driver/compare/v0.8.1...v0.8.2) (2022-04-10)


### Bug Fixes

* Appium 2 compatibility ([fea70b8](https://github.com/dlenroc/appium-roku-driver/commit/fea70b8852e16134a9883cd7afef49e2cf37c533))

### [0.8.1](https://www.github.com/dlenroc/appium-roku-driver/compare/v0.8.0...v0.8.1) (2022-01-29)


### Features

* switch to `configureApp` ([567bf1e](https://www.github.com/dlenroc/appium-roku-driver/commit/567bf1e3e4805e2f2deb018229159ad834befea7))

## [0.8.0](https://www.github.com/dlenroc/appium-roku-driver/compare/v0.7.1...v0.8.0) (2021-10-30)


### Features

* support for `link text` and `partial link text` selector strategies ([f5f1920](https://www.github.com/dlenroc/appium-roku-driver/commit/f5f1920929948ebdef3f3dc009fba524b95edad5))
* URL support in `installApp` command ([137f178](https://www.github.com/dlenroc/appium-roku-driver/commit/137f17847da70b5bd8a69b6436faae318e865900))


### Bug Fixes

* `noReset` reset strategy ([a9fda32](https://www.github.com/dlenroc/appium-roku-driver/commit/a9fda32e75d3db048cf933d1c2bf7fed7dfaedc5))
* implicit wait ([a58b7a9](https://www.github.com/dlenroc/appium-roku-driver/commit/a58b7a9fc265a035c935c85b856e63d42738bb40))

### [0.7.1](https://www.github.com/dlenroc/appium-roku-driver/compare/v0.7.0...v0.7.1) (2021-09-20)


### Bug Fixes

* type definition ([fa0a28f](https://www.github.com/dlenroc/appium-roku-driver/commit/fa0a28fdb8e606fa355bfbad47a33a69a0e1f6c3))

## [0.7.0](https://www.github.com/dlenroc/appium-roku-driver/compare/v0.6.0...v0.7.0) (2021-07-26)


### Features

* `entryPoint` capability ([6e3e51b](https://www.github.com/dlenroc/appium-roku-driver/commit/6e3e51b18924bc327a103a3cf6256e2e8f3db139))

## [0.6.0](https://www.github.com/dlenroc/appium-roku-driver/compare/v0.5.0...v0.6.0) (2021-06-12)


### Features

* `alert` commands ([f198302](https://www.github.com/dlenroc/appium-roku-driver/commit/f1983026fac3972e836738894aecac63505c6766))
* url in `app` capability ([10ca982](https://www.github.com/dlenroc/appium-roku-driver/commit/10ca9824e361bf109c9ee462063db6f3c26c7131))


### Bug Fixes

* custom keyboard/dialog components ([4d307c4](https://www.github.com/dlenroc/appium-roku-driver/commit/4d307c43e6ade0bd5e457aa330df5eb7f545f596))

## [0.5.0](https://www.github.com/dlenroc/appium-roku-driver/compare/v0.4.1...v0.5.0) (2021-05-30)


### Features

* `elementResponseAttributes` setting ([ba30505](https://www.github.com/dlenroc/appium-roku-driver/commit/ba30505d68903c43e5eb83ab79a557a21f688f24))

### [0.4.1](https://www.github.com/dlenroc/appium-roku-driver/compare/v0.4.0...v0.4.1) (2021-05-10)


### Bug Fixes

* background state in `queryAppState` ([8890658](https://www.github.com/dlenroc/appium-roku-driver/commit/8890658951976da3bb57b014871c961a72012db6))

## [0.4.0](https://www.github.com/dlenroc/appium-roku-driver/compare/v0.3.1...v0.4.0) (2021-05-10)


### Features

* `arguments` capability ([39dca64](https://www.github.com/dlenroc/appium-roku-driver/commit/39dca64cce6b3dea838cf1c5f2510a5d5afd2e12))
* `context` capability ([e6f6007](https://www.github.com/dlenroc/appium-roku-driver/commit/e6f6007afb6ed13b51610bd6ca51907e94bd624d))
* `pullFile` command ([248ba82](https://www.github.com/dlenroc/appium-roku-driver/commit/248ba8246b171085b88f6218a084854a3f3be650))
* `pullFolder` command ([ed7bfb9](https://www.github.com/dlenroc/appium-roku-driver/commit/ed7bfb9b6440a97f92915cf9415006a974074b19))
* `pushFile` command ([13ce0bf](https://www.github.com/dlenroc/appium-roku-driver/commit/13ce0bf3f6b7606e592eef5973e44878fcf9c5cf))
* `registry` capability ([268d64b](https://www.github.com/dlenroc/appium-roku-driver/commit/268d64bb6008d35282d11f501d9cb1a21c2fb962))


### Bug Fixes

* incorrect use of the Settings API ([e9e256e](https://www.github.com/dlenroc/appium-roku-driver/commit/e9e256eb6d6187cf5dcb2a1694594998967f0ded))

### [0.3.1](https://www.github.com/dlenroc/appium-roku-driver/compare/v0.3.0...v0.3.1) (2021-05-01)


### Bug Fixes

* application reset ([74e0b86](https://www.github.com/dlenroc/appium-roku-driver/commit/74e0b866c205bd408566aa96832a57722bfc9ad2))
* key release support ([6c01234](https://www.github.com/dlenroc/appium-roku-driver/commit/6c012344c83090cae4c4b37e5a97433a89dbf021))

## [0.3.0](https://www.github.com/dlenroc/appium-roku-driver/compare/v0.2.0...v0.3.0) (2021-03-28)


### Features

* ability to manage registry ([c9bd291](https://www.github.com/dlenroc/appium-roku-driver/commit/c9bd291aad832b075a420115a99febf17f12a9c3))


### Bug Fixes

* args for `execute` command ([4dcc891](https://www.github.com/dlenroc/appium-roku-driver/commit/4dcc891e790513b5683828a51bede694ed63ba52))

## [0.2.0](https://www.github.com/dlenroc/appium-roku-driver/compare/v0.1.1...v0.2.0) (2021-03-27)


### Features

* implicit wait ([150b257](https://www.github.com/dlenroc/appium-roku-driver/commit/150b257a7cecb29c5075668d5298746c86be5054))
* simplify keyboard commands ([7c94470](https://www.github.com/dlenroc/appium-roku-driver/commit/7c9447038dc58f1b845baf025118fa151c70cdd0))
