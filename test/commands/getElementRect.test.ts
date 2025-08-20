import { deepEqual } from 'node:assert/strict';
import { after, before, it } from 'node:test';
import { remote } from 'webdriverio';

let driver: WebdriverIO.Browser;

before(async () => {
  driver = await remote({
    port: 4723,
    capabilities: { 'appium:arguments': { scene: 'getElementRect' } } as any,
    logLevel: 'silent',
  });
});

after(async () => {
  await driver?.deleteSession();
});

it('getElementRect', async (ctx) => {
  await driver.$('#test').waitForDisplayed({ timeout: 1e4 });
  await driver.$$('#test').map(async (testElement) => {
    const name = await testElement.$('#name').getText();
    await ctx.test(name, async () => {
      const element = await testElement.$('#element');
      const actual = await driver.getElementRect(await element.elementId);
      const expected = JSON.parse(await testElement.$('#expected').getText());
      deepEqual(actual, expected);
    });
  });
});
