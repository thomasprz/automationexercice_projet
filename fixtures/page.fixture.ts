import { BasePage } from "../pages/base.page";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { SignupPage } from "../pages/signup.page";
import { AccountCreatedPage } from "../pages/account-created.page";
import { DeleteAccountPage } from "../pages/delete-account.page";
import {test as pagesTest} from '@playwright/test' // On renomme test de Playwright pour éviter toute confusion avec d'autres variables.
import { ContactPage } from "../pages/contact.page";
import { TestCasesPages } from "../pages/test-cases.page";
import { ProductsPage } from "../pages/products.page";
import { ProductDetailsPage } from "../pages/product-details.page";

interface Pages {
    base : BasePage
    home : HomePage
    login : LoginPage
    signup : SignupPage
    accountCreated : AccountCreatedPage
    deleteAccount : DeleteAccountPage
    contact : ContactPage
    testcases : TestCasesPages
    products : ProductsPage
    productDetails : ProductDetailsPage
}

export const pages = pagesTest.extend<Pages>({ //On étend la fonctionnalité de Playwright en ajoutant des objets Pages.
    base: async({page}, use) => {
        await use(new BasePage(page))
    },
    home: async({page}, use) => {
        await use(new HomePage(page))
    },
    login: async({page}, use) => {
        await use(new LoginPage(page))
    },
    signup: async({page}, use) => {
        await use(new SignupPage(page))
    },
    accountCreated: async({page}, use) => {
        await use(new AccountCreatedPage(page))
    },
    deleteAccount: async ({page}, use) => {
        await use(new DeleteAccountPage(page))
    },
    contact: async({page}, use) => {
        await use(new ContactPage(page))
    },
    testcases: async({page}, use) => {
        await use(new TestCasesPages(page))
    },
    products: async({page}, use) => {
        await use(new ProductsPage(page))
    },
    productDetails: async({page}, use) => {
        await use(new ProductDetailsPage(page))
    }
})