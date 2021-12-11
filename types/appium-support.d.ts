declare module '@appium/support' {
  import { Element } from '@appium/base-driver';

  namespace util {
    function wrapElement(el: string): Element;
  }

  namespace logger {
    function getLogger(name: string): {
      info: (...args: any[]) => void;
    };
  }
}
