import { util } from '@appium/support';
import type { KeyDownAction, KeyUpAction } from '@appium/types';
import type { Driver } from '../Driver.ts';

export async function setValue(
  this: Driver,
  text: string,
  elementId: string
): Promise<void> {
  const keyActions: (KeyDownAction | KeyUpAction)[] = [];

  for (const char of text) {
    keyActions.push(
      { type: 'keyDown', value: char },
      { type: 'keyUp', value: char }
    );
  }

  await this.performActions([
    {
      id: 'remote',
      type: 'pointer',
      actions: [
        {
          type: 'pointerMove',
          origin: util.wrapElement(elementId),
          x: 0,
          y: 0,
        },
      ],
    },
    {
      id: 'remote',
      type: 'key',
      actions: keyActions,
    },
  ]);
}
