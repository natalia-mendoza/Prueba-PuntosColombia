import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/sauce-Demo/LoginPage';
import { NavigateTo } from '../pageobjects/sauce-Demo/NavigateTo';
import { ProductPage } from '../pageobjects/sauce-Demo/ProductPage';
import { CartPage } from '../pageobjects/sauce-Demo/CartPage';
import { CheckoutPage } from '../pageobjects/sauce-Demo/CheckoutPage';

test.describe('Login Locked Scenario', () => {
  test('Locked out user login', async ({ page }) => {
    const navigateTo = new NavigateTo(page)
    await navigateTo.loginPage()
    const loginPage = new LoginPage(page)
    await loginPage.doLogin('locked_out_user', 'secret_sauce')
    
    const errorMessage =  page.locator('h3[data-test="error"]')
    await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.')
  });
});


test.describe('Purchase Scenario', () => {
  test('Standard user adds product to cart and completes purchase', async ({ page }) => {

    const navigateTo = new NavigateTo(page)
    const loginPage = new LoginPage(page)
    const productPage = new ProductPage(page)
    const cartPage = new CartPage(page)
    const checkoutPage = new CheckoutPage(page)

    await navigateTo.loginPage()
    await loginPage.doLogin('standard_user', 'secret_sauce')

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    
    await productPage.addToCart('Sauce Labs Backpack');
    await cartPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInformation('Natalia', 'Mendoza', '12345');
    await checkoutPage.finishCheckout();

    const confirmationMessage = await checkoutPage.getConfirmationMessage();
    expect(confirmationMessage).toBe('Thank you for your order!');
  });
});

