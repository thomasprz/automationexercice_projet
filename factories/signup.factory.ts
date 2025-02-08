import { faker } from "@faker-js/faker";

export function createSignupUser() {
    return {
        name: faker.person.firstName(),
        email: faker.internet.email(),
    };
}

export function accountInformation(){
    return {
        password: faker.internet.password(),
        days : faker.number.int({ min: 1, max: 31 }).toString(),
        months: faker.number.int({ min: 1, max: 12 }).toString(),
        years : faker.number.int({ min: 1900, max: 2021 }).toString(),
    };
}

export function addressInformation(){
    return{
        firstname: faker.person.firstName(),
        lastname : faker.person.lastName(),
        company : faker.person.jobTitle(),
        address : faker.location.streetAddress(),
        address2 : faker.location.secondaryAddress(),
        country : 'Australia',
        state : faker.location.state(),
        city : faker.location.city(),
        zipcode : faker.location.zipCode(),
        mobile : faker.phone.number(),
    };
}
