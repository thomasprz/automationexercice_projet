import {Page, Locator, expect} from'@playwright/test'
import { BasePage } from '../pages/base.page'

export class FooterComponent extends BasePage{
    readonly subscriptionHeader : Locator
    readonly subscriptionEmail : Locator
    readonly subscribeButton : Locator
    readonly copyright : Locator
    readonly alertSuccessSubs : Locator

    constructor(page:Page){
        super(page);
        this.subscriptionHeader = page.getByRole('heading', {name:'Subscription', exact:true})
        this.subscriptionEmail = page.getByRole('textbox', { name: 'Your email address' });
        this.subscribeButton = page.locator('#subscribe')
        this.copyright = page.locator('.pull-left')
        this.alertSuccessSubs = page.locator('.alert-success')
    }

    async fillSubscription(email){
        await this.subscriptionEmail.fill(email)
        await this.subscribeButton.click()
    }
}

