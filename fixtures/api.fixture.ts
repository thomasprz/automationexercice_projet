import { BasePage } from "../pages/base.page";
import { CreateAccountAPIPage } from "../pages/api/create-accountAPI.page";
import { ResponseAPIPage } from "../pages/api/response.page";
import {test as requestsTest} from '@playwright/test'

interface Requests {
  api: CreateAccountAPIPage;
  apiR: ResponseAPIPage;
}

export const api = requestsTest.extend<Requests>({
  api: async ({ request }, use) => {
    await use(new CreateAccountAPIPage(request));
  },
  apiR: async ({}, use) => {
    await use(new ResponseAPIPage());
  },
});