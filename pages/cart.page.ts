import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page';


export class CartPage extends BasePage {
    readonly productInCart : Locator
    readonly rowForProduct : Locator
    readonly cellPrice : Locator
    readonly cellQuantity : Locator
    readonly cellTotalPrice : Locator

    constructor(page:Page){
    super(page)
    this.productInCart = page.locator('tbody tr')
    this.rowForProduct = page.locator('#cart_info_table tbody tr');
    this.cellPrice = page.locator('.cart_price')
    this.cellQuantity = page.locator('.cart_quantity')
    this.cellTotalPrice = page.locator('.cart_total_price')
    }

    async expectAddedProducts(products: { id: number; name: string; price: number; quantity: number }[]) {
        for (const { name, price, quantity } of products) {
            const totalPrice = price * quantity;
            
            await expect(this.page.getByRole('row', { name }).locator(this.cellPrice)).toHaveText(`Rs. ${price}`);
            await expect(this.page.getByRole('row', { name }).locator(this.cellQuantity)).toHaveText(quantity.toString());
            await expect(this.page.getByRole('row', { name }).locator(this.cellTotalPrice)).toHaveText(`Rs. ${totalPrice}`);
        }
    }

}