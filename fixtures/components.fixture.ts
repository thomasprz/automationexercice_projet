import { BasePage } from "../pages/base.page";
import { HeaderComponent } from "../components/header.component"; 
import {test as componentsTest} from '@playwright/test'
import { FooterComponent } from "../components/footer.component";

interface Components {
    header : HeaderComponent
    footer : FooterComponent
}

export const components = componentsTest.extend<Components>({
    header: async({page}, use) => {
        await use(new HeaderComponent(page))
    },
    footer: async({page}, use) => {
        await use(new FooterComponent(page))
    }
})