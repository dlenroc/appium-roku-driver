import { errors } from '@appium/base-driver';
import { util } from '@appium/support';
import type {
  ActionSequence,
  KeyAction,
  NullAction,
  PointerAction,
} from '@appium/types';
import type { Key } from '@dlenroc/roku-ecp';
import * as ecp from '@dlenroc/roku-ecp';
import { setTimeout as sleep } from 'node:timers/promises';
import type { Driver } from '../Driver.ts';
import { focus } from './internal/focus.js';

const Keys: Record<string, Key> = {
  '\uE002': 'Info', // help
  '\ue003': 'Backspace', // backspace
  '\ue006': 'Enter', // return
  '\ue007': 'Select', // enter
  '\ue00b': 'Play', // pause
  '\uE00C': 'Back', // escape
  '\uE00E': 'ChannelUp', // page_up
  '\uE00F': 'ChannelDown', // page_down
  '\ue011': 'Home', // home
  '\ue012': 'Left', // arrow_left
  '\ue013': 'Up', // arrow_up
  '\ue014': 'Right', // arrow_right
  '\ue015': 'Down', // arrow_down
  '\uE01A': 'InputAV1', // numpad_0
  '\uE01B': 'InputHDMI1', // numpad_1
  '\uE01C': 'InputHDMI2', // numpad_2
  '\uE01D': 'InputHDMI3', // numpad_3
  '\uE01E': 'InputHDMI4', // numpad_4
  '\uE01F': 'InputTuner', // numpad_5
  '\uE036': 'InstantReplay', // f6
  '\uE037': 'Rev', // f7
  '\uE038': 'Play', // f8
  '\uE039': 'Fwd', // f9
  '\uE03A': 'VolumeMute', // f10
  '\uE03B': 'VolumeDown', // f11
  '\uE03C': 'VolumeUp', // f12
  // Search
  // FindRemote
  // PowerOff
};

export async function performActions(
  this: Driver,
  actions: ActionSequence[]
): Promise<void> {
  for (const action of actions) {
    switch (action.type) {
      case 'none':
        await performNoneActions.call(this, action.actions);
        break;
      case 'key':
        await performKeyActions.call(this, action.actions);
        break;
      case 'pointer':
        await performPointerActions.call(this, action.actions);
        break;
      default:
        throw new errors.InvalidArgumentError(
          `Unsupported action: ${JSON.stringify(action)}`
        );
    }
  }
}

async function performNoneActions(
  this: Driver,
  actions: NullAction[]
): Promise<void> {
  for (const action of actions) {
    switch (action.type) {
      case 'pause':
        await sleep(action.duration);
        break;
      default:
        throw new errors.InvalidArgumentError(
          `Unsupported none action: ${JSON.stringify(action)}`
        );
    }
  }
}

async function performKeyActions(
  this: Driver,
  actions: KeyAction[]
): Promise<void> {
  for (let i = 0, n = actions.length; i < n; i++) {
    const action = actions[i]!;
    const nextAction = actions[i + 1];

    if (action.type === 'pause') {
      await performNoneActions.call(this, [action]);
      continue;
    }

    let key = Keys[action.value] || action.value;
    key = key?.length === 1 ? `LIT_${encodeURIComponent(key)}` : key;

    if (
      action.type === 'keyDown' &&
      nextAction?.type === 'keyUp' &&
      action.value === nextAction.value
    ) {
      i++;
      this.pressedKey = undefined;
      await ecp.keypress(this.sdk.ecp, { key });
      continue;
    }

    switch (action.type) {
      case 'keyDown':
        this.pressedKey = key;
        await ecp.keydown(this.sdk.ecp, { key });
        break;
      case 'keyUp':
        this.pressedKey = undefined;
        await ecp.keyup(this.sdk.ecp, { key });
        break;
      default:
        throw new errors.InvalidArgumentError(
          `Unsupported key action: ${JSON.stringify(action)}`
        );
    }
  }
}

async function performPointerActions(
  this: Driver,
  actions: PointerAction[]
): Promise<void> {
  for (const action of actions) {
    if (action.type === 'pause') {
      await performNoneActions.call(this, [action]);
      continue;
    }

    if (action.type === 'pointerMove') {
      const origin = action.origin ?? '';
      const elementId = util.unwrapElement(origin);

      if (origin === elementId) {
        throw new errors.InvalidArgumentError(
          '"origin" property of pointerMove action must be an element ID: ' +
            JSON.stringify(action)
        );
      }

      if (action.x || action.y) {
        throw new errors.InvalidArgumentError(
          '"x" and "y" properties of pointerMove action are not supported: ' +
            JSON.stringify(action)
        );
      }

      await focus.call(this, elementId, {
        timeout: Math.max(0, action.duration ?? 0) || 1e4,
      });

      continue;
    }

    throw new errors.InvalidArgumentError(
      `Unsupported pointer action: ${JSON.stringify(action)}`
    );
  }
}
