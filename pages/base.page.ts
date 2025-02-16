import {Locator, Page} from '@playwright/test'

export class BasePage {
     readonly page : Page
     readonly buttonConsent: Locator;
     readonly buttonAcceptDialog : Locator
     readonly arrowUp : Locator

    constructor(page:Page) {
        this.page = page
        this.buttonConsent = page.getByRole('button', { name: 'Consent' });
        this.buttonAcceptDialog = page.getByRole('button', { name: 'Submit' });
        this.arrowUp = page.locator('#scrollUp')
    }
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

    async takeScreenShot(screenShotName: string){
        await this.page.screenshot({ path: `./e2e/download/ui/home/${screenShotName}.png` });
    }
    
    async clickScrollUpArrow(){
        this.arrowUp.click()
    }
}