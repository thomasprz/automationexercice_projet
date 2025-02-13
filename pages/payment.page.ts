import { BasePage } from "./base.page";
import {Locator, Page, expect} from '@playwright/test'
import { PaymentDonePage } from "./payment-done.page";

export class PaymentPage extends BasePage {
    readonly nameOnCard : Locator
    readonly cardNumber: Locator
    readonly cvc: Locator
    readonly expirationMonth: Locator
    readonly expirationYear: Locator
    readonly payConfirmOrderButton : Locator
    readonly alert : Locator


    constructor(page:Page){
        super(page)
        this.nameOnCard= page.locator('[name="name_on_card"]')
        this.cardNumber= page.locator('[data-qa="card-number"]')
        this.cvc= page.locator('[data-qa="cvc"]')
        this.expirationMonth=page.locator('[name="expiry_month"]')
        this.expirationYear=page.locator('[data-qa="expiry-year"]')
        this.payConfirmOrderButton = page.locator('#submit')
        this.alert = page.locator('.alert-success')
    }

    async fillPaymentInformation(details){
        await this.nameOnCard.fill(details.fullName)
        await this.cardNumber.fill(details.cardNumber)
        await this.cvc.fill(details.cvc)
        await this.expirationMonth.fill(details.expiryMonth)
        await this.expirationYear.fill(details.expiryYear)
    }

    private async isAlertVisible(){
        await this.alert.isVisible()
    }

    async clickPayAndConfirm() {
        await this.payConfirmOrderButton.click();
        await this.isAlertVisible();
        return new PaymentDonePage(this.page);
      }
}