import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page';


export class CartPage extends BasePage {
    readonly productInCart : Locator
    readonly rowForProduct : Locator
    readonly cellPrice : Locator
    readonly cellQuantity : Locator
    readonly cellTotalPrice : Locator
    readonly proceedToCheckout : Locator
    readonly linkRegisterLogin : Locator
    readonly buttonDeleteQuantity : Locator
    readonly sectionCartEmpty : Locator

    constructor(page:Page){
    super(page)
    this.productInCart = page.locator('tbody tr')
    this.rowForProduct = page.locator('#cart_info_table tbody tr');
    this.cellPrice = page.locator('.cart_price')
    this.cellQuantity = page.locator('.cart_quantity')
    this.cellTotalPrice = page.locator('.cart_total_price')
    this.proceedToCheckout = page.locator('.check_out')
    this.linkRegisterLogin = page.getByRole('link', {name:'Register / Login'})
    this.buttonDeleteQuantity = page.locator('.cart_quantity_delete');
    this.sectionCartEmpty = page.locator('#empty_cart');

    }

    async clickRegisterLogin(){
        await this.linkRegisterLogin.click()
    }
    
    async clickProceedToCheckout(){
        await this.proceedToCheckout.click()
    }

    async expectCartPage(){
        await expect(this.page).toHaveURL('/view_cart')
    }

    async expectAddedProducts(products: { name: string; price: number; quantity: string }[]) {
        for (const product of products) { 
          const totalPrice = product.price * Number(product.quantity);
          await expect(this.getProductName(product.name).locator(this.cellPrice)).toHaveText(`Rs. ${product.price}`);
          await expect(this.getProductName(product.name).locator(this.cellQuantity)).toHaveText(product.quantity);
          await expect(this.getProductName(product.name).locator(this.cellTotalPrice)).toHaveText(`Rs. ${totalPrice}`);
        }
    
      }
      private getProductName(productName: string) {
        return this.page.getByRole('row', { name: productName });
      }

    async expectAddedOneProduct(product) {
        const totalPrice = product.price * Number(product.quantity)
        await expect(this.getProductName(product.name).locator(this.cellPrice)).toHaveText(`Rs. ${product.price}`); 
        await expect(this.getProductName(product.name).locator(this.cellQuantity)).toHaveText(product.quantity);
        await expect(this.getProductName(product.name).locator(this.cellTotalPrice)).toHaveText(`Rs. ${totalPrice}`);
    }


    async clickDeleteQuantityByName(productName){
      await this.getProductName(productName).locator(this.buttonDeleteQuantity).click();
    }

}