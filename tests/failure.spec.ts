import { test, expect } from '@playwright/test';
import { Config } from '../config';

test.beforeEach(async ({ page }) => {
  await page.goto(Config.BASE_URL);
});

test('Teste de "Fumaça" com falha', { tag: '@Smoke' }, async ({ page }) => {
  await page.getByTestId('username').fill(Config.USER_NAME);
  await page.getByTestId('password').fill(Config.PASSWORD);

  await page.getByTestId('login-button').click();
  expect(1).toBe(2);
});

test('Teste Regressão com falha', { tag: '@Regression' }, async ({ page }) => {
  await page.getByTestId('username').fill(Config.USER_NAME);
  await page.getByTestId('password').fill(Config.PASSWORD);

  await page.getByTestId('login-button').click();
  expect(1).toBe(2);
});
