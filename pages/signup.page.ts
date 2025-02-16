import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { DeleteAccountPage } from "./delete-account.page";
import { AccountCreatedPage } from "./account-created.page";
import { LoginPage } from "./login.page";
import { HeaderComponent } from "../components/header.component";

export class SignupPage extends BasePage {
    readonly accountInformationTitle : Locator
    readonly gender : Locator
    readonly name : Locator
    readonly email : Locator
    readonly password : Locator
    readonly days : Locator
    readonly months : Locator
    readonly years : Locator
    readonly checkboxNewsletter : Locator
    readonly offersCheckbox : Locator
    readonly firstNameField : Locator
    readonly lastNameField : Locator
    readonly companyField : Locator
    readonly addressField : Locator
    readonly address2Field : Locator
    readonly countryField : Locator
    readonly stateField : Locator
    readonly cityField : Locator
    readonly zipcodeField : Locator
    readonly mobilePhoneField : Locator
    readonly creatAccountButton  : Locator
    readonly accountCreated : AccountCreatedPage
    readonly deleteAccount : DeleteAccountPage
    readonly login: LoginPage;
    readonly accountedCreated : AccountCreatedPage
    readonly header : HeaderComponent

    constructor(page:Page){
    super(page)
    this.accountInformationTitle = page.locator('.text-center > h2')
    this.gender = page.getByLabel(' Mr.')
    this.name = page.locator('#name')
    this.email = page.locator('#email')
    this.password = page.locator('#password')
    this.days = page.locator('#days')
    this.months = page.locator('#months')
    this.years = page.locator('#years')
    this.checkboxNewsletter = page.getByLabel('Sign up for our newsletter!')
    this.offersCheckbox = page.getByLabel('Receive special offers from our partners!')
    this.firstNameField = page.locator('#first_name')
    this.lastNameField = page.locator('#last_name')
    this.companyField = page.locator('#company')
    this.addressField = page.locator('#address1')
    this.address2Field = page.locator('#address2')
    this.countryField = page.locator('#country')
    this.stateField = page.locator('#state')
    this.cityField = page.locator('#city')
    this.zipcodeField = page.locator('#zipcode')
    this.mobilePhoneField = page.locator('#mobile_number')
    this.creatAccountButton = page.getByRole('button', {name:'Create Account'})
    this.deleteAccount = new DeleteAccountPage(page);
    this.accountCreated = new AccountCreatedPage(page)
    this.header = new HeaderComponent(page)
    this.login = new LoginPage(page)
    this.deleteAccount = new DeleteAccountPage(page)
    }

    async fillAccountInformation(user){
        await this.gender.check()
        await this.password.fill(user.password)
        await this.days.selectOption(user.days)
        await this.months.selectOption(user.months)
        await this.years.selectOption(user.years)
        await this.checkboxNewsletter.check()
        await this.offersCheckbox.check()
    }

    async fillAddressInformation(user){
        await this.firstNameField.fill(user.firstname)
        await this.lastNameField.fill(user.lastname)
        await this.companyField.fill(user.company)
        await this.addressField.fill(user.address1)
        await this.address2Field.fill(user.address2)
        await this.countryField.selectOption(user.country)
        await this.stateField.fill(user.state)
        await this.cityField.fill(user.city)
        await this.zipcodeField.fill(user.zipcode)
        await this.mobilePhoneField.fill(user.mobile_number)
        await this.creatAccountButton.click()
    }

    //Assertions
    async expectSignupPage(){
        await expect(this.page).toHaveURL('/signup')
    }

    async expectAccountInformation(user){
        await expect(this.name).toHaveValue(user.name)
        await expect(this.email).toHaveValue(user.email)
    }

}

