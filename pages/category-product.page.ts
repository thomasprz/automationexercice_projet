import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page';


export class CategoryProductPage extends BasePage {


    constructor(page:Page){
    super(page)
    }

    async expectCategoryProductsPage(){
        await expect(this.page).toHaveURL(/category_products/)
    }

    getHeaderName(header: string) {
        return this.page.getByRole('heading', { name: header });
      }
}