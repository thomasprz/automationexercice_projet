import { Locator, Page} from '@playwright/test'
import { BasePage } from './base.page'
import { HomePage } from './home.page'

export class PaymentDonePage extends BasePage {
    readonly buttonContinue : Locator
    readonly buttonDownloadInvoice : Locator


    constructor(page:Page){
        super(page)
        this.buttonContinue = page.getByRole('link', {name:'Continue'})
        this.buttonDownloadInvoice = page.getByRole('link', {name:'Download Invoice'})
    }

    async clickContinue() {
        await this.buttonContinue.click();
        return new HomePage(this.page);
      }

    async downloadInvoice() {
        const downloadPromise = this.page.waitForEvent('download'); //Retourne une Promise, c'est un objet qui représente une opération asynchrone dont le résultat n'est pas encore disponible immédiatement, mais qui le sera à l'avenir.

        await this.buttonDownloadInvoice.click();
        const download = await downloadPromise; //Permet d’attendre que l’événement 'download' se déclenche.
        if (download) {
          await download.saveAs('./e2e/download/invoice/invoice.txt'); //download.saveAs(path) enregistre le fichier à un emplacement spécifique.
          console.log('File downloaded successfully.');
        } else {
          console.log('File download failed.');
        }
      }
}