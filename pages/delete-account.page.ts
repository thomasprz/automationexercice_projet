import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page'

export class DeleteAccountPage extends BasePage{
    readonly accountDeleteTitle : Locator

    constructor(page:Page){
        super(page)
        this.accountDeleteTitle = page.locator('[data-qa="account-deleted"]')
    }

    async expectDeleteAccount(){
        await expect(this.page).toHaveURL('/delete_account')
        await expect(this.accountDeleteTitle).toBeVisible()
        await expect(this.accountDeleteTitle).toHaveText("Account Deleted!")

    }
}