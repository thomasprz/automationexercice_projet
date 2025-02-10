import { faker } from "@faker-js/faker";

export function createContactUsForm() {
    return {
    name: faker.person.fullName(),
    email: faker.internet.email({ provider: 'fakerjs.dev' }),
    subject: faker.lorem.sentence({ min: 5, max: 7 }),
    message: faker.lorem.paragraphs({ min: 2, max: 4 }),
  };
}