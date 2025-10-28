import { test, expect } from '@playwright/test';
import { Config } from '../config';

test.beforeEach(async ({ page }) => {
  await page.goto(Config.BASE_URL);

  await page.getByTestId('username').fill(Config.USER_NAME);
  await page.getByTestId('password').fill(Config.PASSWORD);

  await page.getByTestId('login-button').click();

  await page.waitForURL(`${Config.BASE_URL}/inventory.html`);
});

test(
  'Adicionar produto ao carrinho com sucesso',
  { tag: '@Regression' },
  async ({ page }, testInfo) => {
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

    await expect(page.getByTestId('shopping-cart-badge')).toBeVisible();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

    await page.getByTestId('shopping-cart-link').click();

    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    await testInfo.attach('produto adicionado com sucesso', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  },
);

test(
  'Remover produto do carrinho com sucesso',
  { tag: '@Regression' },
  async ({ page }, testInfo) => {
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

    await expect(page.getByTestId('shopping-cart-badge')).toBeVisible();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(1);

    await page.getByTestId('shopping-cart-link').click();

    await page.getByTestId('remove-sauce-labs-backpack').click();

    await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);

    await testInfo.attach('produto removido com sucesso', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  },
);
