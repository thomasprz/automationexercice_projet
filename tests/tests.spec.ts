import { test, expect } from '../fixtures/base.fixture';
import { createSignupUser } from '../factories/signup.factory';

test.describe('Test Cases automationexercice.com', () => {
  
    test.beforeEach(async ({ home }) => {
        await home.goTo();
        await home.popup()
        await home.expectHomePage();
    });

    test('Test Case 1: Register User', async ({ home, login, header }) => {
        //Arrange
        const userBaseData = createSignupUser()

        //Act
        await header.openSignupLogin() 
        await login.expectLoginPage()
        await login.fillUserSignup(userBaseData)
    });
});