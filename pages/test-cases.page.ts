import { BasePage } from "./base.page";
import {Locator, Page, expect} from '@playwright/test'

export class TestCasesPages extends BasePage{
    readonly header : Locator


    constructor(page:Page){
        super(page)
        this.header = page.getByRole('heading', { name: 'Test Cases', exact: true }); //Avec exact: true, Playwright ne sélectionne que l'élément dont le texte est exactement "Test Cases".
    }

    async expectTestCasesPage(){
        await expect(this.page).toHaveURL('/test_cases')
        await expect(this.header).toBeVisible()
    }
}