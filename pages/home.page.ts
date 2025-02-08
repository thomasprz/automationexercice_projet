import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
        readonly title : Locator

    constructor(page:Page){
        super(page)
        this.title = page.getByAltText('Website for automation practice')

    }
    //Assertions
    async expectHomePage(){
        await expect(this.title).toBeVisible()
    }
}