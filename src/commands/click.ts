import { util } from '@appium/support';
import type { Driver } from '../Driver.ts';

export async function click(this: Driver, elementId: string): Promise<void> {
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
      actions: [
        { type: 'keyDown', value: 'Select' },
        { type: 'keyUp', value: 'Select' },
      ],
    },
  ]);
}
