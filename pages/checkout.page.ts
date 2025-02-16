import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page'

export class CheckoutPage extends BasePage{
    readonly fieldDescription : Locator
    readonly placeOrderButton : Locator
    readonly deliveryAddressLocator : Locator
    readonly billingAddressLocator: Locator
    readonly cellPrice : Locator
    readonly cellQuantity  : Locator
    readonly cellTotal : Locator

    constructor(page:Page){
        super(page)
        this.fieldDescription = page.locator('.form-control')
        this.placeOrderButton = page.getByRole('link', {name:'Place Order'})
        this.deliveryAddressLocator = page.locator('#address_delivery');
        this.billingAddressLocator = page.locator('#address_invoice')
        this.cellPrice = page.locator('.cart_price')
        this.cellQuantity = page.locator('.cart_quantity')
        this.cellTotal = page.locator('.cart_total')

    }

    async checkoutPage(){
        await expect(this.page).toHaveURL('/checkout')
    }
    async checkDeliveryAddress(address) {
        const strAddress = `Mr. ${address.firstname} ${address.lastname} ${address.company} ${address.address1} ${address.address2} ${address.city} ${address.state} ${address.zipcode} ${address.country} ${address.mobile_number}`;
        await expect(this.deliveryAddressLocator).toContainText(strAddress);
    }

    async checkBillingAddress(address) {
        const strAddress = `Mr. ${address.firstname} ${address.lastname} ${address.company} ${address.address1} ${address.address2} ${address.city} ${address.state} ${address.zipcode} ${address.country} ${address.mobile_number}`;
        await expect(this.billingAddressLocator).toContainText(strAddress);
    }

    async clickPlaceOrder(){
        await this.placeOrderButton.click()
    }
    async fillDescription(desc) {
        await this.fieldDescription.fill(desc.description);
    }

    getProductname(productName){
        return this.page.getByRole('row', {name : productName })
    }
    async checkReviewOrderOneProduct(product){
        const totalPrice = product.price * Number(product.quantity)
        await expect(this.getProductname(product.name).locator(this.cellPrice)).toHaveText(`Rs. ${product.price}`)
        await expect(this.getProductname(product.name).locator(this.cellQuantity)).toHaveText(product.quantity)
        await expect(this.getProductname(product.name).locator(this.cellTotal)).toHaveText(`Rs. ${totalPrice}`)
    }
}
