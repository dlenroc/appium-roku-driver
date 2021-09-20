declare module '@appium/base-driver' {
  export * from '@appium/base-driver/index'

  export type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;

  export const errors: Record<
    | 'NotYetImplementedError'
    | 'NotImplementedError'
    | 'BadParametersError'
    | 'InvalidArgumentError'
    | 'NoSuchDriverError'
    | 'NoSuchElementError'
    | 'UnknownCommandError'
    | 'StaleElementReferenceError'
    | 'ElementNotVisibleError'
    | 'InvalidElementStateError'
    | 'UnknownError'
    | 'ElementIsNotSelectableError'
    | 'ElementClickInterceptedError'
    | 'ElementNotInteractableError'
    | 'InsecureCertificateError'
    | 'JavaScriptError'
    | 'XPathLookupError'
    | 'TimeoutError'
    | 'NoSuchWindowError'
    | 'NoSuchCookieError'
    | 'InvalidCookieDomainError'
    | 'InvalidCoordinatesError'
    | 'UnableToSetCookieError'
    | 'UnexpectedAlertOpenError'
    | 'NoAlertOpenError'
    | 'ScriptTimeoutError'
    | 'InvalidElementCoordinatesError'
    | 'IMENotAvailableError'
    | 'IMEEngineActivationFailedError'
    | 'InvalidSelectorError'
    | 'SessionNotCreatedError'
    | 'MoveTargetOutOfBoundsError'
    | 'NoSuchAlertError'
    | 'NoSuchContextError'
    | 'InvalidContextError'
    | 'NoSuchFrameError'
    | 'UnableToCaptureScreen'
    | 'UnknownMethodError'
    | 'UnsupportedOperationError'
    | 'ProxyRequestError',
    { new(...args: any[]): Error }
  >;

  export type SelectorStrategy = 'id' | 'tag name' | 'css selector' | 'xpath' | any;
}
