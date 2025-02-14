import { faker } from "@faker-js/faker";

export function createAccountAPI(){
    return {
        name: faker.person.firstName(),
        email: faker.internet.email(), 
        password: faker.internet.password(), 
        title : 'Mr',
        birth_date : faker.number.int({ min: 1, max: 31 }).toString(),
        birth_month : faker.number.int({ min: 1, max: 12 }).toString(),
        birth_year : faker.number.int({ min: 1900, max: 2021 }).toString(),
        firstname : faker.person.firstName(),
        lastname : faker.person.lastName(),
        company : faker.person.jobTitle(),
        address1 : faker.location.streetAddress(),
        address2 : faker.location.secondaryAddress(),
        country : 'Australia',
        zipcode : faker.location.zipCode(),
        state : faker.location.state(),
        city : faker.location.city(),
        mobile_number: faker.phone.number(),
    }
}