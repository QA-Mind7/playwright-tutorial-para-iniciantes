import { test, expect } from '@playwright/test';
import { Config } from '../config';

test.beforeEach(async ({ page }) => {
  await page.goto(Config.BASE_URL);
});

test('Teste temporário para simular falha', async ({ page }, testInfo) => {
  await page.getByTestId('username').fill(Config.USER_NAME);
  await page.getByTestId('password').fill('Passw@rd!');

  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('inventory-container')).toBeVisible();
});

test('Realizar login com sucesso', async ({ page }, testInfo) => {
  await page.getByTestId('username').fill(Config.USER_NAME);
  await page.getByTestId('password').fill(Config.PASSWORD);

  await page.getByTestId('login-button').click();

  await page.waitForURL(`${Config.BASE_URL}/inventory.html`);
  await expect(page.getByTestId('inventory-container')).toBeVisible();

  await testInfo.attach('login com sucesso', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});

test('Realizar login informando credenciais inválidas', async ({ page }, testInfo) => {
  await page.getByTestId('username').fill('user.invalid');
  await page.getByTestId('password').fill('senha');

  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('error')).toContainText(
    'Username and password do not match any user in this service',
  );

  await expect(page).toHaveURL(Config.BASE_URL);

  await testInfo.attach('login inválido', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});
