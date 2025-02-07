import {Locator, Page, expect} from '@playwright/test'

export class BasePage {
     readonly page : Page
     readonly buttonConsent: Locator;

    constructor(page:Page) {
        this.page = page
        this.buttonConsent = page.getByRole('button', { name: 'Consent' });
    }

    //Actions
    async goTo(url ='/'){
        await this.page.goto(url) 
    }

    async popup() {
          await this.buttonConsent.click();
    }

}