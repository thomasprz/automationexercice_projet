import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from '../pages/base.page'
import { CategoryProductPage } from '../pages/category-product.page'

export class LeftSidebarComponent extends BasePage{
    readonly sidebarLocator : Locator
    readonly headerSidebarCategory : Locator
    readonly headerSidebarBrandCategory : Locator


    constructor(page:Page){
      super(page);
      this.sidebarLocator = page.locator('#accordian');
      this.headerSidebarCategory = page.locator('.left-sidebar').getByRole('heading', { name: 'Category' });
      this.headerSidebarBrandCategory = page.locator('.left-sidebar').getByRole('heading', {name: 'Brands'})
    }


  async expectLeftSidebar() {
    await expect(this.sidebarLocator).toBeVisible();
    await expect(this.headerSidebarCategory).toBeVisible();
    await expect(this.headerSidebarBrandCategory).toBeVisible()
  }

  private getCategory(category) {
    return this.page.getByRole('link', { name: ` ${category}`});
}

  private getCategoryProducts(products) {
    return this.page.getByRole('link', { name: products});
  }

  async openCategoryByName(category) {
    await this.getCategory(category).click();
  }

  async openCategoryProductsByName(products) {
    await this.getCategoryProducts(products).click();
    return new CategoryProductPage(this.page);
  }

  async openBrandCategory(brand){
    await this.page.getByRole('link', {name: brand}).click()
  }
}