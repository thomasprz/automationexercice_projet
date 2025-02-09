import { test, expect } from '../fixtures/base.fixture';
import { accountInformation, addressInformation, createSignupUser } from '../factories/signup.factory';
import { createAccountAPI } from '../factories/api.factory';
import { createFakeLoginUser } from '../factories/login.factory';

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
        await header.openDeleteAccount()

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
        await header.openDeleteAccount()

        //Assert
        await deleteAccount.expectDeleteAccount()
    })


    test('Test Case 3: Login User with incorrect email and password', async ({header, login}) => {
        //Arrange
        const userLoginData = createFakeLoginUser()
        //Act
        await header.openSignupLogin()
        await login.expectLoginPage()
        await login.fillLoginAccount(userLoginData)
        await expect(login.paragraphLoginIncorrectData).toBeVisible()
    })
});