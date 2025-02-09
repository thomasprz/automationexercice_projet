import { faker } from "@faker-js/faker";

export function createFakeLoginUser() {
    return{
        email : faker.internet.email(),
        password : faker.internet.password(),
    };
}