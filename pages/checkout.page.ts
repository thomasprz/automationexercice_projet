import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page'

export class CheckoutPage extends BasePage{
    readonly fieldDescription : Locator
    readonly placeOrderButton : Locator
    readonly deliveryAddressLocator : Locator

    constructor(page:Page){
        super(page)
        this.fieldDescription = page.locator('.form-control')
        this.placeOrderButton = page.getByRole('link', {name:'Place Order'})
        this.deliveryAddressLocator = page.locator('#address_delivery');

    }

    async checkoutPage(){
        await expect(this.page).toHaveURL('/checkout')
    }
    async checkDeliveryAddress(address) {
        const strAddress = `Mr. ${address.firstname} ${address.lastname} ${address.company} ${address.address1} ${address.address2} ${address.city} ${address.state} ${address.zipcode} ${address.country} ${address.mobile_number}`;
        await expect(this.deliveryAddressLocator).toContainText(strAddress);
    }
    async clickPlaceOrder(){
        await this.placeOrderButton.click()
    }
    async fillDescription(desc) {
        await this.fieldDescription.fill(desc.description);
    }
}
