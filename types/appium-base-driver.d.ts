declare module 'appium-base-driver' {
  type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;

  export function routeConfiguringFunction(driver: BaseDriver): any;

  export function server(opts: { routeConfiguringFunction: typeof routeConfiguringFunction; port: number; hostname?: string; allowCors?: boolean; basePath?: string; plugins?: any[] }): any;

  export class BaseDriver {
    protected sessionId?: string;
    protected locatorStrategies: string[];
    protected opts: Record<string, string>;
    protected caps: Record<string, string>;
    protected desiredCapConstraints: Record<string, any>;
    protected implicitWaitMs: number;

    constructor(opts?: Record<string, any>, shouldValidateCaps?: boolean);

    createSession(jsonwpDesiredCapabilities?: Record<string, any>, jsonwpRequiredCaps?: Record<string, any>, w3cCapabilities?: Record<string, any>): Promise<[string, Record<string, any>]>;

    getSessions(): Promise<{ id: string; capabilities: Record<string, any> }[]>;

    getSession(): Promise<Record<string, any>>;

    deleteSession(): Promise<void>;

    updateSettings(setting: Record<string, any>): Promise<void>;

    getSettings(): Promise<Record<string, any>>;

    timeouts(type?: string, ms?: number, script?: number, pageLoad?: number, implicit?: number): Promise<void>;

    getTimeouts(): Promise<{ command: number; implicit: number }>;

    implicitWait(ms: number): Promise<void>;

    executeCommand(cmd: string, ...args: any[]): Promise<any>;

    reset(): Promise<void>;

    getLogTypes(): Promise<string[]>;

    getLog(type: string): Promise<string[]>;

    logCustomEvent(vendor: string, event: string): Promise<void>;

    getLogEvents(type?: string | string[]): Promise<Record<string, any>>;

    executeDriverScript(script: string, scriptType?: string, timeout?: number): Promise<any>;

    findElement(strategy: string, selector: string): Promise<Element>;

    findElements(strategy: string, selector: string): Promise<Element[]>;

    findElementFromElement(strategy: string, selector: string, elementId: string): Promise<Element>;

    findElementsFromElement(strategy: string, selector: string, elementId: string): Promise<Element[]>;
  }

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
    { new (...args: any[]): Error }
  >;

  export type SelectorStrategy = 'id' | 'tag name' | 'css selector' | 'xpath' | any;

  export interface Element {
    ELEMENT: string;
  }
}
