import { BasePage } from "./base.page";
import {Locator, Page, expect} from '@playwright/test'

export class ContactPage extends BasePage {
    readonly getInTouchTitle : Locator
    readonly nameInput : Locator
    readonly emailInput : Locator
    readonly subjectInput : Locator
    readonly messageInput : Locator
    readonly uploadFile : Locator
    readonly submitButton : Locator
    readonly alertMessage : Locator
    readonly homeButton : Locator

    constructor(page:Page){
        super(page)
        this.getInTouchTitle = page.locator('.contact-form', {hasText:'Get In Touch'})
        this.nameInput = page.locator('[data-qa="name"]')
        this.emailInput = page.locator('[data-qa="email"]')
        this.subjectInput = page.locator('[data-qa="subject"]')
        this.messageInput = page.locator('#message')
        this.uploadFile = page.locator('[name="upload_file"]');
        this.submitButton = page.locator('[data-qa="submit-button"]')
        this.alertMessage = page.locator('#contact-page').locator('.alert-success');
        this.homeButton = page.locator('.btn-success')
    }

    async expectContactPage(){
        await expect(this.page).toHaveURL('/contact_us')
    }

    async fillContact(form){
        await this.nameInput.fill(form.name)
        await this.emailInput.fill(form.email)
        await this.subjectInput.fill(form.subject)
        await this.messageInput.fill(form.message)
        await this.uploadFile.setInputFiles("/Users/thomasprz/Documents/SiteInternet/Assets/Logo.jpg");
        await this.submitButton.click()
    }

    async clickHomeButton(){
        await this.homeButton.click()
    }
}