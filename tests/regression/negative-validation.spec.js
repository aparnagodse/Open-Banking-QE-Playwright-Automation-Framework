import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { InventoryPage } from '../../pages/InventoryPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckoutPage } from '../../pages/CheckoutPage.js';
import { users, checkoutData } from '../../fixtures/testData.js';
import { logStep } from '../../utils/helpers.js';

test.describe('Open Banking Negative Validation', () => {
  test('Invalid login should show error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    logStep('Open login page');
    await loginPage.open();

    logStep('Login with invalid credentials');
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);

    logStep('Validate login error');
    await expect(await loginPage.getErrorMessage()).toContain(
      'Username and password do not match'
    );
  });

  test('Checkout should fail when postal code is missing', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    logStep('Open login page');
    await loginPage.open();

    logStep('Login with valid credentials');
    await loginPage.login(users.validUser.username, users.validUser.password);

    logStep('Add product to cart');
    await inventoryPage.addBackpackToCart();

    logStep('Open cart');
    await inventoryPage.openCart();

    logStep('Start checkout');
    await cartPage.clickCheckout();

    logStep('Fill incomplete checkout details');
    await checkoutPage.fillCheckoutDetails(
      checkoutData.missingPostalCode.firstName,
      checkoutData.missingPostalCode.lastName,
      checkoutData.missingPostalCode.postalCode
    );

    logStep('Continue checkout');
    await checkoutPage.continueCheckout();

    await expect(await checkoutPage.getErrorMessage()).toContain(
      'Error: Postal Code is required'
    );
  });
});