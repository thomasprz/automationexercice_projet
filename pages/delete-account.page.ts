import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page'
import { HomePage } from './home.page';

export class DeleteAccountPage extends BasePage{
    readonly accountDeleteTitle : Locator
    private readonly buttonContinue: Locator;

    constructor(page:Page){
        super(page)
        this.accountDeleteTitle = page.locator('[data-qa="account-deleted"]')
        this.buttonContinue = page.getByRole('link', {name:'Continue'})
    }

    async expectDeleteAccount(){
        await expect(this.page).toHaveURL('/delete_account')
        await expect(this.accountDeleteTitle).toBeVisible()
        await expect(this.accountDeleteTitle).toHaveText("Account Deleted!")
    }

    async clickContinue() {
        await this.buttonContinue.click();
        return new HomePage(this.page);
    }
}