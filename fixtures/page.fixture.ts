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
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";
import { PaymentPage } from "../pages/payment.page";
import { PaymentDonePage } from "../pages/payment-done.page";
import { CategoryProductPage } from "../pages/category-product.page";
import { BrandProductPage } from "../pages/brand-product.page";

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
    cart : CartPage
    checkout : CheckoutPage
    payment : PaymentPage
    paymentDone : PaymentDonePage
    categoryProduct : CategoryProductPage
    brandProduct : BrandProductPage
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
    },
    cart: async({page}, use) => {
        await use(new CartPage(page))
    },
    checkout:async({page}, use) => {
        await use(new CheckoutPage(page))
    },
    payment: async ({page}, use) => {
        await use(new PaymentPage(page))
    },
    paymentDone : async ({page}, use) => {
        await use(new PaymentDonePage(page))
    },
    categoryProduct : async ({page}, use) => {
        await use(new CategoryProductPage(page))
    },
    brandProduct: async({page}, use) => {
        await use(new BrandProductPage(page))
    },

 })