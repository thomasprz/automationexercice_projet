import { test, expect } from '../fixtures/base.fixture';
import { accountInformation, addressInformation, createSignupUser } from '../factories/signup.factory';
import { createAccountAPI } from '../factories/api.factory';
import { createFakeLoginUser } from '../factories/login.factory';
import { createContactUsForm } from '../factories/contact.factory'
import { createFakePayment } from '../factories/payment.factory';
import { randomDesc } from '../factories/checkout.factory'

test.describe('Test Cases automationexercice.com', () => {
  
    test.beforeEach(async ({ home }) => {
        await home.goTo();
        await home.popup()
        await home.expectHomePage();
    });

    test('Test Case 1: Register User', async ({ home, login, header, signup, accountCreated, deleteAccount }) => {
        //Arrange
        const userBaseData = createSignupUser()
        const userAccountInformation = accountInformation() //On récupère le résultat de la fonction enterAccountInformation() qui utilise Faker et on l'affecte à une variable.
        const userAddressInformation = addressInformation()

        //Act
        await header.openSignupLogin() 
        await login.expectLoginPage()
        await expect(login.headerSignup).toBeVisible()
        await login.fillUserSignup(userBaseData)
        await signup.expectSignupPage()
        await signup.expectAccountInformation(userBaseData)
        await signup.fillAccountInformation(userAccountInformation)
        await signup.fillAddressInformation(userAddressInformation)
        await accountCreated.expectAccountCreated()
        await accountCreated.clickContinue()
        await header.expectLoggedUser(userBaseData.name)
        await header.clickDeleteAccount()

        //Assert
        await deleteAccount.expectDeleteAccount()
    });

    test('Test Case 2: Login User with correct email and password', async ({header, login, deleteAccount, api, apiR}) => {
        //Arrange
        const createAccountAPIData = createAccountAPI()
        //Act
        await header.openSignupLogin()
        await login.expectLoginPage()
        await expect(login.headerLogin).toBeVisible()

        const response = await api.createUser(createAccountAPIData);
        const responseBody = await response.json();
        apiR.checkResponseCode(responseBody, 201);
        apiR.checkResponseMessage(responseBody, 'User created!');

        await login.fillLoginAccount(createAccountAPIData)
        await header.expectLoggedUser(createAccountAPIData.name)
        await header.clickDeleteAccount()

        //Assert
        await deleteAccount.expectDeleteAccount()
    })


    test('Test Case 3: Login User with incorrect email and password', async ({header, login}) => {
        //Arrange
        const userLoginData = createFakeLoginUser()
        //Act
        await header.openSignupLogin()
        await login.expectLoginPage()
        await expect(login.headerLogin).toBeVisible()
        await login.fillLoginAccount(userLoginData)
        await expect(login.paragraphLoginIncorrectData).toBeVisible()
    })

    test('Test Case 4: Logout User', async ({header, login}) => {
        //Arrange
        const userLoginData = {name: process.env.USERNAME , email:process.env.EMAIL, password: process.env.PASSWORD}

        //Act
        await header.openSignupLogin()
        await login.expectLoginPage()
        await expect(login.headerLogin).toBeVisible()
        await login.fillLoginAccount(userLoginData)
        await header.expectLoggedUser(userLoginData.name)
        await header.clickLogout()
        await login.expectLoginPage()
    })

    test('Test Case 5: Register User with existing email', async ({header, login}) => {
        //Arrange 
        const userBaseData = {name: process.env.USERNAME, password: process.env.PASSWORD , email:process.env.EMAIL }
        //Act
        await header.openSignupLogin()
        await login.expectLoginPage()
        await expect(login.headerSignup).toBeVisible()
        await login.fillUserSignup(userBaseData)
        await expect(login.paragraphSignupExistData).toBeVisible()
    })

    test('Test Case 6: Contact Us Form', async ({header, contact, home}) => {
        //Arrange
        const contactUsFormData = createContactUsForm()

        //Act
        await header.openContactUs()
        await expect(contact.getInTouchTitle).toBeVisible()
        await contact.fillContact(contactUsFormData)
        await contact.catchDialog()
        await contact.buttonAcceptDialog.click()
        await expect(contact.alertMessage).toBeVisible()
        await contact.clickHomeButton()
        await home.expectHomePage()

    })

    test('Test Case 7: Verify Test Cases Page', async ({header, home, testcases}) => {
        await header.openTestCases()
        await testcases.expectTestCasesPage()

    })

    test('Test Case 8: Verify All Products and product detail page', async ({header, products, productDetails}) => {
        //Arrange
        const detailsData = {
            name: 'Blue Top',
            category: 'Women > Tops',
            price: '500',
            availability: 'In Stock',
            condition: 'New',
            brand: 'Polo',
          };

        //Act
        await header.openProducts()
        await products.expectProductsPage()
        await products.openFirstViewProduct()
        await productDetails.expectProductDetailsPage()
        await productDetails.expectProductDetails(detailsData)
    })

    test('Test Case 9: Search Product', async ({header, products}) => {
        const search = 'Blue';

        //Act
        await header.openProducts();
        await products.expectProductsPage();
        await products.searchProduct(search);

        //Assert
        await products.isFoundProductsHaveSearchText(search);

    })

    test('Test Case 10: Verify Subscription in home page', async ({header, home, products, footer}) => {
        //Arrange
        const emailData = createFakeLoginUser()

        //Act
        await home.scrollDownPage()
        await expect(footer.subscriptionHeader).toBeVisible()
        await footer.fillSubscription((emailData.email))
        await expect(footer.alertSuccessSubs).toBeVisible()
        await expect(footer.alertSuccessSubs).toContainText('You have been successfully subscribed!')
    })

    test('Test Case 11: Verify Subscription in Cart page', async ({header,footer, cart}) => {
        //Arrange
        const emailData = createFakeLoginUser()
        
        //Act
        await header.openCart()
        await cart.scrollDownPage()
        await expect(footer.subscriptionHeader).toBeVisible()
        await footer.fillSubscription(emailData.email)
        await expect(footer.alertSuccessSubs).toBeVisible()
        await expect(footer.alertSuccessSubs).toContainText('You have been successfully subscribed!')
    })

    test('Test Case 12: Add Products in Cart', async ({header, login, products, cart}) => {
          const productsData = [
            {
              id: 0,
              name: 'Blue Top',
              price: 500,
              quantity: '1',
            },
            {
              id: 2,
              name: 'Sleeveless Dress',
              price: 1000,
              quantity: '1',
            },
          ];

            await header.openProducts()
            await products.addProductNumberAndContinue(productsData[0].id) 
            await products.addProductNumberAndViewCart(productsData[1].id)
            const rows = await cart.rowForProduct.count();
            expect(rows).toBe(2);
            //Assert
            await cart.expectAddedProducts(productsData);
        })

    test('Test Case 13: Verify Product quantity in Cart', async ({home, productDetails, cart}) => {
            //Arrange
            const productData = {
                id : 4 , 
                name: 'Winter Top', 
                price : 600,
                quantity: '4'
            }
            //Act
            await home.clickOnProduct(productData.id)
            await productDetails.expectProductDetailsPage()
            await productDetails.increaseQuantitAndViewCart(productData.quantity)
            await cart.expectAddedOneProduct(productData)
    })

    test('Test Case 14: Place Order: Register while Checkout', async ({header, home, cart, signup, checkout, payment, accountCreated, login, deleteAccount}) => {
        //Arrange
        const userBaseData = createSignupUser()
        const userAccountInformation = accountInformation() //On récupère le résultat de la fonction enterAccountInformation() qui utilise Faker et on l'affecte à une variable.
        const userAddressInformation = addressInformation()
        const paymentInformations = createFakePayment()
        const description = randomDesc()

        //Act
        await home.addProductNumberAndContinue(0)
        await header.openCart()
        await cart.expectCartPage()
        await cart.clickProceedToCheckout()
        await cart.clickRegisterLogin()
        await login.fillUserSignup(userBaseData)
        await signup.expectSignupPage()
        await signup.expectAccountInformation(userBaseData)
        await signup.fillAccountInformation(userAccountInformation)
        await signup.fillAddressInformation(userAddressInformation)
        await accountCreated.expectAccountCreated()
        await accountCreated.clickContinue()
        await header.expectLoggedUser(userBaseData.name)
        await header.openCart()
        await cart.clickProceedToCheckout()
        await checkout.checkoutPage()
        await checkout.checkDeliveryAddress(userAddressInformation)
        await checkout.fillDescription(description)
        await checkout.clickPlaceOrder()
        await payment.fillPaymentInformation(paymentInformations)
        await payment.clickPayAndConfirm()
        await header.clickDeleteAccount()
        await deleteAccount.expectDeleteAccount()
        await expect(signup.deleteAccount.accountDeleteTitle).toContainText('Account Deleted!');
        await signup.deleteAccount.clickContinue()
    })

    test('Test Case 15: Place Order: Register before Checkout', async ({header, login, signup, home, cart, checkout, payment}) => {
        //Arrange
        const userBaseData = createSignupUser()
        const userAccountInformation = accountInformation()
        const userAddressInformation = addressInformation()
        const description = randomDesc()
        const paymentOrder = createFakePayment()

        //Act
        await header.openSignupLogin()
        await login.fillUserSignup(userBaseData)
        await signup.fillAccountInformation(userAccountInformation)
        await signup.fillAddressInformation(userAddressInformation)
        await signup.accountCreated.expectAccountCreated()
        await signup.accountCreated.clickContinue()
        await header.expectLoggedUser(userBaseData.name)
        await home.addProductNumberAndContinue(0)
        await header.openCart()
        await cart.expectCartPage()
        await cart.clickProceedToCheckout()
        await checkout.checkDeliveryAddress(userAddressInformation)
        await checkout.fillDescription(description)
        await checkout.clickPlaceOrder()
        await payment.fillPaymentInformation(paymentOrder)
        await payment.clickPayAndConfirm()
        await header.clickDeleteAccount()
        await expect(signup.deleteAccount.accountDeleteTitle).toBeVisible()
        await signup.deleteAccount.clickContinue()
    })

    test('Test Case 16: Place Order: Login before Checkout', async ({header, signup, login, home, cart, api, apiR, checkout, payment}) => { //*
        //Act
        const userBaseDataAPI = createAccountAPI()
        const desc = randomDesc()
        const userBaseDataPayment = createFakePayment()
        
        await header.openSignupLogin()
        const response = await api.createUser(userBaseDataAPI)
        const responseBody = await response.json();
        console.log(responseBody)

        apiR.checkResponseCode(responseBody, 201);
        apiR.checkResponseMessage(responseBody, 'User created!');
        await login.fillLoginAccount(userBaseDataAPI)
        await home.addProductNumberAndContinue(0)
        await header.openCart()
        await cart.expectCartPage()
        await cart.clickProceedToCheckout()
        await checkout.checkDeliveryAddress(userBaseDataAPI)
        await checkout.fillDescription(desc)
        await checkout.clickPlaceOrder()
        await payment.fillPaymentInformation(userBaseDataPayment)
        await payment.clickPayAndConfirm()
        await header.clickDeleteAccount()
        await signup.deleteAccount.expectDeleteAccount()
    })

    test('Test Case 17: Remove Products From Cart', async ({header, home, cart }) => {
        //Arrange
        const productsData = [
            {
              id: 0,
              name: 'Blue Top',
              price: 500,
              quantity: '1',
            },
            {
              id: 2,
              name: 'Sleeveless Dress',
              price: 1000,
              quantity: '1',
            },
          ];
 
        //Act
        await home.products.addProductNumberAndContinue(productsData[0].id)
        await home.products.addProductNumberAndContinue(productsData[1].id)
        await header.openCart()
        await cart.expectCartPage()
        await cart.expectAddedProducts(productsData)
        await cart.clickDeleteQuantityByName(productsData[0].name)
        await cart.clickDeleteQuantityByName(productsData[1].name)

        //Assert
        await expect(cart.sectionCartEmpty).toBeVisible();

    })
});