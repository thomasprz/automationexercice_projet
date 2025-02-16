import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { ProductsPage } from "./products.page";
import { LeftSidebarComponent } from "../components/sidebar.component";
import { HeaderComponent } from "../components/header.component";
import { CartPage } from "./cart.page";
import { FooterComponent } from "../components/footer.component";

export class HomePage extends BasePage {
        readonly title : Locator
        readonly headerFullFledged : Locator
        readonly linkViewProduct : Locator
        readonly addToCart : Locator
        readonly continueShoppingButton : Locator
        readonly headerRecommendedItems : Locator
        readonly linkAddToCartFromRecommendedItems : Locator
        readonly viewCartButton : Locator
        readonly headerSubscription : Locator
        readonly products : ProductsPage
        readonly footer : FooterComponent
        readonly leftSidebar : LeftSidebarComponent
        readonly header : HeaderComponent

    constructor(page:Page){
        super(page)
        this.title = page.getByAltText('Website for automation practice')
        this.headerFullFledged = page.getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' });
        this.linkViewProduct = page.getByRole('link', {name: 'View Product'})
        this.addToCart = page.locator('.add-to-cart')
        this.continueShoppingButton = page.getByRole('button', {name:'Continue Shopping'})
        this.headerRecommendedItems = page.getByRole('heading', {name:'recommended items'})
        this.linkAddToCartFromRecommendedItems = page.locator('#recommended-item-carousel').locator('.add-to-cart');
        this.viewCartButton = page.getByRole('link', {name:'View Cart'})
        this.products = new ProductsPage(page);
        this.footer = new FooterComponent(page)
        this.leftSidebar = new LeftSidebarComponent(page);
        this.header = new HeaderComponent(page)

    }

    async expectHomePage(){
        await expect.soft(this.page).toHaveURL('/') 
        await expect(this.title).toBeVisible()
    }

    async clickOnProduct(index){
        await this.linkViewProduct.nth(index).click()
    }

    async addProductNumberAndContinue(index) {
        await this.addToCart.nth(index).click();
        await this.continueShoppingButton.click();
      }

    async addFromRecommendedItemsAndViewCart() {
        await this.linkAddToCartFromRecommendedItems.last().click();
        await this.viewCartButton.click();
        return new CartPage(this.page);
      }
    
}