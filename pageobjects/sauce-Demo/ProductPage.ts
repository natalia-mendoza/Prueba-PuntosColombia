import { Page } from '@playwright/test';

export class ProductPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCart(productName: string) {
    await this.page.locator(`text=${productName}`).click()
    await this.page.locator("//button[contains(text(), 'Add to cart')]").click()
  }
}
