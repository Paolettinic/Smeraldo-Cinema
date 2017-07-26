import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//Models
import {Purchase} from '../../models/purchase.model';

@Injectable()
export class PurchaseProvider {

    //private _purchases: Array<Purchase> = null;
    private _s : any;
    constructor(private _http: Http) {
        console.log('Hello PurchaseProvider Provider');
    }

    //Salvataggio dei purchases sul server
    public _savePurchases(purchases: Array<Purchase>): Promise<string>{
      return this._http.post('api/purchases/create', purchases)
	  .toPromise()
	  .then((res : Response) => {
	    this._s = res.json();
	    return this._s.text;
	  })
	  .catch((error) => {
	    console.log(error);
	  });
    }
        
   //Controllo del purchase prima del salvataggio
   public _checkPurchases(purchases: Array<Purchase>): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._http.post('api/purchases/check', purchases).toPromise().then((res: Response) => {
                    const json = res.json() as boolean;
                    resolve(json);
                })
                .catch(() => {
                    reject();
                });
        });
    }
}