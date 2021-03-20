import { Key } from '@dlenroc/roku';
import { Element } from 'appium-base-driver';
import { util } from 'appium-support';
import { longSleep } from 'asyncbox';
import { Driver } from '../../Driver';

interface Action {
  type: 'pause' | 'key' | 'keyDown' | 'keyUp' | 'input' | 'pointer' | 'pointerMove' | 'pointerDown' | 'pointerUp' | 'keyPress';
  id?: string;
  value?: string;
  actions?: Action[];
  origin?: Element;
  duration?: number;
}

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

export async function performActions(this: Driver, action: Action | Action[]): Promise<void> {
  if (Array.isArray(action)) {
    for (let i = 0, n = action.length; i < n; i++) {
      if (action[i + 1]) {
        if (action[i].type === 'pointerDown' && action[i + 1].type === 'pointerUp') {
          i++;
          await this.performActions({ type: 'keyPress', value: 'Select' });
          continue;
        }

        if (action[i].type === 'keyDown' && action[i + 1].type === 'keyUp' && action[i].value === action[i + 1].value) {
          i++;
          await this.performActions({ type: 'keyPress', value: action[i].value });
          continue;
        }
      }

      await this.performActions(action[i]);
    }

    return;
  }

  switch (action.type) {
    case 'key':
      return await this.performActions(action.actions);
    case 'keyDown':
      return await this.roku.ecp.keydown(Keys[action.value] || (action.value as Key));
    case 'keyUp':
      return await this.roku.ecp.keyup(Keys[action.value] || (action.value as Key));
    case 'keyPress':
      return await this.roku.ecp.keypress(Keys[action.value] || (action.value as Key));
    case 'input':
      for (const key of action.value) {
        await this.roku.ecp.keypress(key as Key);
      }
    case 'pointer':
      return await this.performActions(action.actions);
    case 'pointerMove':
      const element = await this.getElOrEls('element-id', util.unwrapElement(action.origin));
      return await element.focus();
    case 'pointerDown':
      return await this.roku.ecp.keydown('Select');
    case 'pointerUp':
      return await this.roku.ecp.keyup('Select');
    case 'pause':
      return await longSleep(action.duration);
    default:
      throw new this.errors.NotYetImplementedError(action.type);
  }
}
