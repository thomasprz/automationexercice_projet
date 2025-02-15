import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page'
import { HomePage } from './home.page'
import { ProductDetailsPage } from './product-details.page';
import { BrandProductPage } from './brand-product.page';

export class ProductsPage extends BasePage {
    readonly details: ProductDetailsPage;
    readonly brands: BrandProductPage;

    readonly productsHeader : Locator
    readonly productsList : Locator
    readonly linkViewProduct : Locator
    readonly fieldSearchProduct : Locator
    readonly buttonSearch : Locator
    readonly headerSearchedProducts : Locator
    readonly singleProduct : Locator
    readonly buttonAddToCart : Locator
    readonly popupContinueShopping : Locator
    readonly popupViewCart : Locator

    constructor(page:Page) {
        super(page)
        this.details = new ProductDetailsPage(page);
        this.brands = new BrandProductPage(page);


        this.productsHeader = page.getByRole('heading', {name:'All Products', exact:true})
        this.headerSearchedProducts = page.getByRole('heading', {name : 'Searched Products', exact:true})
        this.productsList = page.locator('.features_items')
        this.linkViewProduct = page.getByRole('link', { name: 'View Product' });
        this.fieldSearchProduct = page.locator('#search_product')
        this.buttonSearch = page.locator('#submit_search')
        this.singleProduct = page.locator('.single-products');
        this.buttonAddToCart = page.locator('.text-center').getByText('Add to cart');
        this.popupContinueShopping = page.getByRole('button', {name:'Continue Shopping'})
        this.popupViewCart = page.getByRole('link', {name:'View Cart'})
    }

    async expectProductsPage(){
        await expect(this.page).toHaveURL('/products')
        await expect(this.productsHeader).toBeVisible()
    }

    async expectProductsList(){
        await expect(this.productsList).toBeVisible()
    }

    getFirstViewProduct() {
        return this.linkViewProduct.first();
      }

    async openFirstViewProduct(){
        await this.getFirstViewProduct().click();
      }

    async addProductNumberAndContinue(index){
        await this.buttonAddToCart.nth(index).click()
        await this.popupContinueShopping.click()
    }
    async addProductNumberAndViewCart(index){
        await this.buttonAddToCart.nth(index).click()
        await this.popupViewCart.click()
    }

    async clickContinueShopping() {
      await this.popupContinueShopping.click();
    }

    async searchProduct(search){
        await this.fieldSearchProduct.fill(search);
        await this.buttonSearch.click();
        await expect(this.headerSearchedProducts).toBeVisible();
      }
    
      async isFoundProductsHaveSearchText(search) {
        const products = await this.singleProduct.all(); //.all() sert à récupérer tous les éléments d'un locator sous forme de tableau
        if (await this.singleProduct.first().isVisible()) {
          for (const product of products) {
            await expect(product).toContainText(search, { ignoreCase: true });
          }
        } else {
          console.log('No found product');
        }
      }

}