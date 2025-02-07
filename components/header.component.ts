import {Page, Locator, expect} from '@playwright/test'
import { HomePage } from '../pages/home.page'
import { LoginPage } from '../pages/login.page'

export class HeaderComponent{
    readonly page : Page
    readonly home : Locator
    readonly products : Locator
    readonly cart : Locator
    readonly signupLogin : Locator
    readonly testCases : Locator
    readonly apiTesting : Locator
    readonly videoTutorials : Locator
    readonly contactUs : Locator

    constructor(page:Page){
        this.page = page
        this.home = page.getByRole('link', {name:' Home'})
        this.products = page.getByRole('link', {name:' Products'})
        this.cart = page.getByRole('link', {name:' Cart'})
        this.signupLogin = page.getByRole('link', {name:' Signup / Login'})
        this.testCases = page.getByRole('link', {name:' Test Cases'}) 
        this.apiTesting = page.getByRole('link', {name:' API Testing'})
        this.videoTutorials = page.getByRole('link', {name:' Video Tutorials'})
        this.contactUs = page.getByRole('link', {name:' Contact us'})
    }

    async openHome(){
        await this.home.click()
        return new HomePage(this.page)
    }

    async openSignupLogin(){
        await this.signupLogin.click()
        return new LoginPage(this.page)
    }
}