import { faker } from "@faker-js/faker";


export function createFakePayment(){
    return{
        fullName: faker.person.fullName(),
        cardNumber: faker.finance.creditCardNumber({ issuer: '448#-#[5-7]##-####-###L' }), // '4480-0500-0000-0000;
        cvc: faker.finance.creditCardCVV(),
        expiryMonth: faker.number.int({ min: 1, max: 12 }).toString(),
        expiryYear: faker.number.int({ min: 2026, max: 2028 }).toString(),
    }
}