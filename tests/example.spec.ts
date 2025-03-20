import { test, expect } from '@playwright/test'
import { Config } from '../config'

test('login', async ({ page }, testInfo) => {
  await page.goto(Config.BASE_URL)

  await page.getByTestId('username').fill(Config.USER_NAME)
  await page.getByTestId('password').fill(Config.PASSWORD)

  await page.getByTestId('login-button').click()
  await page.waitForURL(`${Config.BASE_URL}/inventory.html`)
  await expect(page.getByTestId('inventory-container')).toBeVisible()

  await testInfo.attach('successfull login', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  })
})

test('has title', async ({ page }, testInfo) => {
  await page.goto('https://playwright.dev/')

  await expect(page).toHaveTitle(/Playwright/)

  await testInfo.attach('', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  })
})

test('get started link', async ({ page }, testInfo) => {
  await page.goto('https://playwright.dev/')

  await page.getByRole('link', { name: 'Get started' }).click()

  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible()

  await testInfo.attach('', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  })
})
