import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { InventoryPage } from '../../pages/InventoryPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckoutPage } from '../../pages/CheckoutPage.js';
import { users, checkoutData } from '../../fixtures/testData.js';
import { logStep } from '../../utils/helpers.js';

test.describe('Open Banking Payment Transfer Validation', () => {
  test('User can login, add products to cart, and start checkout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    logStep('Open login page');
    await loginPage.open();

    logStep('Login with valid user');
    await loginPage.login(users.validUser.username, users.validUser.password);

    logStep('Verify inventory page is loaded');
    await expect(await inventoryPage.isLoaded()).toBeTruthy();

    logStep('Add products to cart');
    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();

    logStep('Validate cart count');
    await expect(await inventoryPage.getCartCount()).toBe('2');

    logStep('Open cart');
    await inventoryPage.openCart();

    logStep('Validate cart items');
    await expect(await cartPage.getCartItemCount()).toBe(2);

    logStep('Start checkout');
    await cartPage.clickCheckout();

    logStep('Validate checkout page');
    await expect(await checkoutPage.isLoaded()).toBeTruthy();

    logStep('Fill checkout details');
    await checkoutPage.fillCheckoutDetails(
      checkoutData.valid.firstName,
      checkoutData.valid.lastName,
      checkoutData.valid.postalCode
    );

    logStep('Continue checkout');
    await checkoutPage.continueCheckout();
  });
});