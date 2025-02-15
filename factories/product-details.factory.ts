import { faker } from "@faker-js/faker";

export function fillFakeReviewProduct(){
    return{
        name : faker.person.fullName(),
        email : faker.internet.email(),
        review : faker.lorem.paragraph(),
    }
}