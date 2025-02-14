import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page';


export class BrandProductPage extends BasePage {


    constructor(page:Page){
    super(page)
    }

      private getHeader(header) {
        return this.page.getByRole('heading', { name: `Brand - ${header}`, exact: true });
      }
    
      async expectBrandProductsPage(brand: string, header: string) {
        await expect(this.page).toHaveURL(`/brand_products/${brand}`);
        await expect(this.getHeader(header)).toBeVisible();
      }

    
}