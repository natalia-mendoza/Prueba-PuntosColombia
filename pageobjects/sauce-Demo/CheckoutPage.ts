import { Page } from '@playwright/test';

export class CheckoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill('input[name="firstName"]', firstName);
    await this.page.fill('input[name="lastName"]', lastName);
    await this.page.fill('input[name="postalCode"]', postalCode);
    await this.page.click('input[type="submit"]');
  }

  async finishCheckout() {
    await this.page.click('button[name="finish"]');
  }

  async getConfirmationMessage() {
    return this.page.locator('h2').textContent();
  }
}
