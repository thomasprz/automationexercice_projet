import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page'

export class ProductDetailsPage extends BasePage{
    readonly productName : Locator
    readonly category : Locator
    readonly price : Locator
    readonly availability : Locator
    readonly condition : Locator
    readonly brand : Locator

    constructor(page:Page){
        super(page)
        this.productName = page.locator('.product-information > h2 ')
        this.category = page.locator('.product-information', {hasText:'Category: '})
        this.price = page.locator('.product-information', {hasText:'Rs. '})
        this.availability = page.locator('.product-information', {hasText:'Availability:'})
        this.condition = page.locator('.product-information', {hasText:'Condition:'})
        this.brand = page.locator('.product-information', {hasText:'Brand:'})
    }

    async expectProductDetailsPage(){
        await expect(this.page).toHaveURL(/product_details/);
    }

    async expectProductDetails(product){
        await expect(this.productName).toContainText(product.name)
        await expect(this.category).toContainText(product.category)
        await expect(this.price).toContainText(product.price)
        await expect(this.availability).toContainText(product.availability)
        await expect(this.condition).toContainText(product.condition)
        await expect(this.brand).toContainText(product.brand)
    }
}