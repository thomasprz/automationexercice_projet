import { faker } from "@faker-js/faker";

export function randomDesc() {
    return {
    description : faker.lorem.text(),
    };
}