import type { ActionSequence, KeyAction, NullAction, PointerAction } from '@appium/types';
import type { Key } from '@dlenroc/roku';
import { longSleep } from 'asyncbox';
import type { Driver } from '../Driver';

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

export async function performActions(this: Driver, actions: ActionSequence[]): Promise<void> {
  for (const action of actions) {
    action.actions = optimizeActions(action.actions);

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
    }
  }
}

async function performNoneActions(this: Driver, actions: NullAction[]): Promise<void> {
  for (const action of actions) {
    switch (action.type) {
      case 'pause':
        await longSleep(action.duration!!);
        break;
    }
  }
}

async function performKeyActions(this: Driver, actions: KeyAction[]): Promise<void> {
  for (const action of actions) {
    // @ts-ignore
    const key = Keys[action.value!!] || action.value;

    switch (action.type) {
      // @ts-ignore
      case 'keyPress':
        this.pressedKey = undefined;
        await this.roku.ecp.keypress(key);
        break;
      case 'keyDown':
        this.pressedKey = key;
        await this.roku.ecp.keydown(key);
        break;
      case 'keyUp':
        this.pressedKey = undefined;
        await this.roku.ecp.keydown(key);
        break;
      case 'pause':
        await performNoneActions.call(this, [action]);
        break;
    }
  }
}

async function performPointerActions(this: Driver, actions: PointerAction[]): Promise<void> {
  for (const action of actions) {
    switch (action.type) {
      case 'pointerMove':
        const element = await this.getElement(action.origin as string);
        await element.focus();
        break;
      // @ts-ignore
      case 'pointerPress':
        // @ts-ignore
        await performKeyActions.call(this, [{ type: 'keyPress', value: 'Select' }]);
        break;
      case 'pointerDown':
        await performKeyActions.call(this, [{ type: 'keyDown', value: 'Select' }]);
        break;
      case 'pointerUp':
        await performKeyActions.call(this, [{ type: 'keyUp', value: 'Select' }]);
        break;
      case 'pause':
        await performNoneActions.call(this, [action]);
        break;
    }
  }
}

function optimizeActions(actions: any): any {
  // Map all keyDown + all keyUp to a keyPress sequence - WebDriverIO sends keys this way
  if (actions.length % 2 === 0) {
    const centerIndex = actions.length / 2;
    const optimizedActions = [];

    for (let i = 0; i < centerIndex; i++) {
      if (actions[i].type === 'keyDown' && actions[centerIndex + i].type === 'keyUp' && actions[i].value === actions[centerIndex + i].value) {
        optimizedActions.push({ type: 'keyPress', value: actions[i].value });
      } else {
        break;
      }
    }

    if (optimizedActions.length === centerIndex) {
      actions = optimizedActions;
    }
  }

  // Map (key/pointer)Down and (key/pointer)Up combination to keyPress
  const optimizedActions = [];

  for (let i = 0, n = actions.length; i < n; i++) {
    if (actions[i + 1]) {
      if (actions[i].type === 'pointerDown' && actions[i + 1].type === 'pointerUp') {
        i++;
        optimizedActions.push({ type: 'pointerPress' });
        continue;
      }

      if (actions[i].type === 'keyDown' && actions[i + 1].type === 'keyUp' && actions[i].value === actions[i + 1].value) {
        i++;
        optimizedActions.push({ type: 'keyPress', value: actions[i].value });
        continue;
      }
    }

    optimizedActions.push(actions[i]);
  }

  return optimizedActions;
}
