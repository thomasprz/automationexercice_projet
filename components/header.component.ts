import {Page, Locator, expect} from '@playwright/test'
import { HomePage } from '../pages/home.page'
import { LoginPage } from '../pages/login.page'
import { DeleteAccountPage } from '../pages/delete-account.page'
import { ContactPage } from '../pages/contact.page'
import { TestCasesPages } from '../pages/test-cases.page'
import { ProductsPage } from '../pages/products.page'
import { CartPage } from '../pages/cart.page'

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
    readonly deleteAccount : Locator
    readonly logout : Locator

    constructor(page:Page){
        this.page = page
        this.home = page.getByRole('link', {name:' Home'})
        this.products = page.getByRole('link', {name:' Products'})
        this.cart = page.getByRole('link', {name:' Cart'})
        this.signupLogin = page.getByRole('link', {name:' Signup / Login'})
        this.testCases = page.getByRole('link', { name: 'Test Cases', exact: true });
        this.apiTesting = page.getByRole('link', {name:' API Testing'})
        this.videoTutorials = page.getByRole('link', {name:' Video Tutorials'})
        this.contactUs = page.getByRole('link', {name:' Contact us'}) // On utilie 'link', car <a href="..."> sont des liens directs
        this.deleteAccount = page.getByRole('link', {name:' Delete Account'})
        this.logout = page.getByRole('link', {name:' Logout'})
    }

    async openHome(){
        await this.home.click()
        return new HomePage(this.page)
    }

    async openSignupLogin(){
        await this.signupLogin.click()
        return new LoginPage(this.page)
    }

    async clickDeleteAccount(){
        await this.deleteAccount.click()
        return new DeleteAccountPage(this.page)
    }

    async clickLogout(){
        await this.logout.click()
        return new LoginPage(this.page)
    }

    async openContactUs(){
        await this.contactUs.click()
        return new ContactPage(this.page)
    }

    async openTestCases(){
        await this.testCases.click()
        return new TestCasesPages(this.page)
    }

    async openProducts(){
        await this.products.click()
        return new ProductsPage(this.page)
    }

    async expectLoggedUser(username){
        // On utilise hasText pour rechercher un texte spécifique dans un élément, et listitem car l'élément "Logged in as {username}" est dans un <li> (élément de liste), pas un lien direct <a>.
        const loggedInLocator = this.page.getByRole('listitem').filter({ hasText: `Logged in as ${username}` }); //filter permet de filtrer une liste d'éléments pour ne garder que ceux qui correspondent à un critère spécifique. // Les backticks permettent d'intégrer des variables directement dans la chaîne de caractères.
        await expect(loggedInLocator).toBeVisible();
    }

    async openCart(){
        await this.cart.click()
        return new CartPage(this.page)
    }
}