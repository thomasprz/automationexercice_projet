import { test, expect } from '../fixtures/base.fixture';
import { accountInformation, addressInformation, createSignupUser } from '../factories/signup.factory';
import { createAccountAPI } from '../factories/api.factory';
import { createFakeLoginUser } from '../factories/login.factory';
import { createContactUsForm } from '../factories/contact.factory'

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
});