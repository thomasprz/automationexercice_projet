import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page'

export class PaymentDonePage extends BasePage {
    readonly orderPlacedTitle : Locator
    readonly continueButton : Locator
    readonly orderConfirmed : Locator
    readonly downloadInvoiceButton : Locator


    constructor(page:Page){
        super(page)
        this.orderPlacedTitle = page.locator('[data-qa="order-placed"]')
        this.orderConfirmed = page.locator('.col-sm-9 > p')
        this.continueButton = page.getByRole('link', {name:'Continue'})
        this.downloadInvoiceButton = page.getByRole('link', {name:'Download Invoice'})
    }

}