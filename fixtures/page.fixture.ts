import { BasePage } from "../pages/base.page";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { SignupPage } from "../pages/signup.page";
import { AccountCreatedPage } from "../pages/account-created.page";
import { DeleteAccountPage } from "../pages/delete-account.page";
import {test as pagesTest} from '@playwright/test' // On renomme test de Playwright pour éviter toute confusion avec d'autres variables.

interface Pages {
    base : BasePage
    home : HomePage
    login : LoginPage
    signup : SignupPage
    accountCreated : AccountCreatedPage
    deleteAccount : DeleteAccountPage
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
    }
})