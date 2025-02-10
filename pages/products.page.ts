import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page'

export class ProductsPage extends BasePage {
    readonly productsHeader : Locator
    readonly productsList : Locator
    readonly linkViewProduct : Locator

    constructor(page:Page) {
        super(page)
        this.productsHeader = page.getByRole('heading', {name:'All Products', exact:true})
        this.productsList = page.locator('.features_items')
        this.linkViewProduct = page.getByRole('link', { name: 'View Product' });
    }

    async expectProductsPage(){
        await expect(this.page).toHaveURL('/products')
        await expect(this.productsHeader).toBeVisible()
    }

    async expectProductsList(){
        await expect(this.productsList).toBeVisible()
    }

    getFirstViewProduct() {
        return this.linkViewProduct.first();
      }
      async openFirstViewProduct(){
        await this.getFirstViewProduct().click();
      }
}