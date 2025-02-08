import { test, expect } from '../fixtures/base.fixture';
import { accountInformation, addressInformation, createSignupUser } from '../factories/signup.factory';

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
});