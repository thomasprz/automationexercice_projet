import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page';


export class CartPage extends BasePage {
    readonly productInCart : Locator
    readonly rowForProduct : Locator
    readonly cellPrice : Locator
    readonly cellQuantity : Locator
    readonly cellTotalPrice : Locator
    readonly proceedToCheckout : Locator
    readonly linkRegisterLogin : Locator
    readonly buttonDeleteQuantity : Locator
    readonly sectionCartEmpty : Locator

    constructor(page:Page){
    super(page)
    this.productInCart = page.locator('tbody tr')
    this.rowForProduct = page.locator('#cart_info_table tbody tr');
    this.cellPrice = page.locator('.cart_price')
    this.cellQuantity = page.locator('.cart_quantity')
    this.cellTotalPrice = page.locator('.cart_total_price')
    this.proceedToCheckout = page.locator('.check_out')
    this.linkRegisterLogin = page.getByRole('link', {name:'Register / Login'})
    this.buttonDeleteQuantity = page.locator('.cart_quantity_delete');
    this.sectionCartEmpty = page.locator('#empty_cart');

    }

    async clickRegisterLogin(){
        await this.linkRegisterLogin.click()
    }
    
    async clickProceedToCheckout(){
        await this.proceedToCheckout.click()
    }

    async expectCartPage(){
        await expect(this.page).toHaveURL('/view_cart')
    }

    async expectAddedProducts(products: { name: string; price: number; quantity: string }[]) { // TABLEAU DONC BOUCLE POUR PARCOURIR LE TABLEAU
        for (const product of products) { //Dans la boucle, la variable product prend successivement la valeur de chaque élément du tableau productsData. 
          const totalPrice = product.price * Number(product.quantity);
          await expect(this.getProductName(product.name).locator(this.cellPrice)).toHaveText(`Rs. ${product.price}`);
          await expect(this.getProductName(product.name).locator(this.cellQuantity)).toHaveText(product.quantity);
          await expect(this.getProductName(product.name).locator(this.cellTotalPrice)).toHaveText(`Rs. ${totalPrice}`);
        }
    
      }
      private getProductName(productName: string) {
        return this.page.getByRole('row', { name: productName });
      }

    async expectAddedOneProduct(product) {
        const totalPrice = product.price * Number(product.quantity)
        await expect(this.getProductName(product.name).locator(this.cellPrice)).toHaveText(`Rs. ${product.price}`); 
        //On récupère le name du produit dans productsData (défini dans le fichier de test). Ensuite, on localise la ligne (row) correspondant à ce nom dans le panier. 
        //Une fois la ligne trouvée, on vérifie que le prix affiché dans cette ligne correspond bien au prix défini dans productsData.
        await expect(this.getProductName(product.name).locator(this.cellQuantity)).toHaveText(product.quantity);
        await expect(this.getProductName(product.name).locator(this.cellTotalPrice)).toHaveText(`Rs. ${totalPrice}`);

        const displayedTotalPrice = await this.getProductName(product.name).locator(this.cellTotalPrice).innerText();
        // Afficher le prix total affiché dans mon panier
        console.log('Prix total affiché dans le panier :', displayedTotalPrice);
    }


    async clickDeleteQuantityByName(productName){
      await this.getProductName(productName).locator(this.buttonDeleteQuantity).click();
    }

}