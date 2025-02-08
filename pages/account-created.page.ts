import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page'

export class AccountCreatedPage extends BasePage {
    readonly accountCreatedTitle : Locator
    readonly continueButton : Locator


    constructor(page:Page){
        super(page)
        this.accountCreatedTitle = page.locator('[data-qa="account-created"]')
        this.continueButton = page.getByRole('link', {name:'Continue'})
    }

    async expectAccountCreated(){
        await expect(this.page).toHaveURL('/account_created')
        await expect (this.accountCreatedTitle).toHaveText('Account Created!')
    }

    async clickContinue(){
        await this.continueButton.click()
    }
}