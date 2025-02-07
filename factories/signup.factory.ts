import { faker } from "@faker-js/faker";

export function createSignupUser() {
    return {
        name: faker.person.firstName(),
        email: faker.internet.email(),
    };
}
