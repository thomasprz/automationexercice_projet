import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { ProductsPage } from "./products.page";
import { LeftSidebarComponent } from "../components/sidebar.component";
import { HeaderComponent } from "../components/header.component";

export class HomePage extends BasePage {
        readonly title : Locator
        readonly linkViewProduct : Locator
        readonly addToCart : Locator
        readonly continueShoppingButton : Locator
        readonly products : ProductsPage
        readonly leftSidebar : LeftSidebarComponent
        readonly header : HeaderComponent

    constructor(page:Page){
        super(page)
        this.title = page.getByAltText('Website for automation practice')
        this.linkViewProduct = page.getByRole('link', {name: 'View Product'})
        this.addToCart = page.locator('.add-to-cart')
        this.continueShoppingButton = page.getByRole('button', {name:'Continue Shopping'})
        this.products = new ProductsPage(page);
        this.leftSidebar = new LeftSidebarComponent(page);
        this.header = new HeaderComponent(page)

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