import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
    readonly signupNameInput : Locator
    readonly signupEmailInput : Locator
    readonly signupButton : Locator

    constructor(page:Page){
        super(page)
        this.signupNameInput = page.locator('[data-qa="signup-name"]')
        this.signupEmailInput = page.locator('[data-qa="signup-email"]')
        this.signupButton = page.getByRole('button', {name:'Signup'})
    }

    //Actions
    async fillUserSignup(user){
        await this.signupNameInput.fill(user.name);
        await this.signupEmailInput.fill(user.email);
        await this.signupButton.click();
      }

    //Assertions
    async expectLoginPage() {
        await expect(this.page).toHaveURL('/login');
        await expect(this.page).toHaveTitle("Automation Exercise - Signup / Login");
      }
}