import { Page } from '@playwright/test';

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  
  async goToCart() {
    await this.page.locator('a[class="shopping_cart_link"]').click()
  }

  async proceedToCheckout() {
    await this.page.click("//button[contains(text(), 'Checkout')]");
  }
}
