declare module 'appium-support' {
  import { Element } from 'appium-base-driver';

  namespace logger {
    function getLogger(
      name: string
    ): {
      info(...args: any[]): void;
      silly(...args: any[]): void;
      verbose(...args: any[]): void;
      info(...args: any[]): void;
      http(...args: any[]): void;
      warn(...args: any[]): void;
      error(...args: any[]): void;
      debug(...args: any[]): void;
      errorAndThrow(...args: any[]): never;
    };
  }

  namespace util {
    function wrapElement(el: string): Element;

    function unwrapElement(el: Element): string;
  }
}
