import { BasePage } from "../pages/base.page";
import { HeaderComponent } from "../components/header.component"; 
import {test as componentsTest} from '@playwright/test'

interface Components {
    header : HeaderComponent
}

export const components = componentsTest.extend<Components>({
    header: async({page}, use) => {
        await use(new HeaderComponent(page))
    },
})