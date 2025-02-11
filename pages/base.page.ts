import {Locator, Page, expect} from '@playwright/test'

export class BasePage {
     readonly page : Page
     readonly buttonConsent: Locator;
     readonly buttonAcceptDialog : Locator

    constructor(page:Page) {
        this.page = page
        this.buttonConsent = page.getByRole('button', { name: 'Consent' });
        this.buttonAcceptDialog = page.getByRole('button', { name: 'Submit' });

    }

    //Actions
    async goTo(url ='/'){
        await this.page.goto(url) 
    }

    async popup() {
          await this.buttonConsent.click();
    }

    async catchDialog() {
        this.page.on('dialog', (dialog) => {
          dialog.accept();
        });
    }

    async scrollDownPage() {
    await this.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
        });
    }
    async scrollUpPage() {
        await this.page.evaluate(() => {
            window.scrollTo(0, 0);
        });
    }
}