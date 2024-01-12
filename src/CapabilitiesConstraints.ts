import type { Constraints } from '@appium/types';

export const capabilitiesConstraints = {
  app: {
    isString: true,
    presence: false,
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
  shouldTerminateApp: {
    isBoolean: true,
    presence: false,
  },
} as const satisfies Constraints;
