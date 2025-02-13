import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
        readonly title : Locator
        readonly linkViewProduct : Locator
        readonly addToCart : Locator
        readonly continueShoppingButton : Locator

    constructor(page:Page){
        super(page)
        this.title = page.getByAltText('Website for automation practice')
        this.linkViewProduct = page.getByRole('link', {name: 'View Product'})
        this.addToCart = page.locator('.add-to-cart')
        this.continueShoppingButton = page.getByRole('button', {name:'Continue Shopping'})
    }

    //Assertions
    async expectHomePage(){
        await expect.soft(this.page).toHaveURL('/') //Avec soft() (le test continue même si une assertion échoue.)        
        await expect(this.title).toBeVisible()
    }

    async clickOnProduct(index){
        await this.linkViewProduct.nth(index).click()
    }

    async addProductNumberAndContinue(index) {
        await this.addToCart.nth(index).click();
        await this.continueShoppingButton.click();
      }
}