import { Injectable } from '@angular/core';
import { Purchase } from '../../models/purchase.model';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PurchaseProvider {

//private _purchases: Array<Purchase> = null;

constructor(private _http: Http) {
        console.log('Hello PurchaseProvider Provider');
    }
    
    /**
     * Salva un purchase sul server
     */
    savePurchase(purchases: Array<Purchase>): Promise<any> {
      console.log("DIO");
        return new Promise((resolve, reject) => {
	    console.log("PORCO");
            this._http.post('api/purchases/create', {
                purchases: purchases
            }).toPromise()
            .then((res: Response) => {
	      console.log("Bastardo");
	      //const result = res.json() as boolean;
	      resolve();
	    })
	    .catch(() => {
	      console.log("ASSASSINO");
	      reject();
	    });
        });
    }
    /**
     * Crea un nuovo purchase sul server
     */
    private _createPurchase(purchase: Purchase) {
	
    }

}