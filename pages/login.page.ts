import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { SignupPage } from "./signup.page";

export class LoginPage extends BasePage {
    readonly signupNameInput : Locator
    readonly signupEmailInput : Locator
    readonly signupButton : Locator
    readonly loginEmailInput : Locator
    readonly loginPasswordInput : Locator
    readonly loginButton : Locator
    readonly headerLogin : Locator
    readonly headerSignup : Locator
    readonly paragraphLoginIncorrectData : Locator
    readonly paragraphSignupExistData : Locator

    constructor(page:Page){
        super(page)   
        this.headerLogin = page.locator('.login-form > h2')
        this.headerSignup = page.locator('.signup-form > h2')
        this.signupNameInput = page.locator('[data-qa="signup-name"]')
        this.signupEmailInput = page.locator('[data-qa="signup-email"]')
        this.loginEmailInput = page.locator('[data-qa="login-email"]')
        this.loginPasswordInput = page.locator('[data-qa="login-password"]')
        this.signupButton = page.getByRole('button', {name:'Signup'})
        this.loginButton = page.getByRole('button', {name:'Login'})
        this.paragraphLoginIncorrectData = page.locator('.login-form', {hasText:'Your email or password is incorrect!'})
        this.paragraphSignupExistData = page.locator('.signup-form', {hasText:'Email Address already exist!'})
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
      }

      async fillLoginAccount(user){
      await this.loginEmailInput.fill(user.email)
      await this.loginPasswordInput.fill(user.password)
      await this.loginButton.click()
      }

}