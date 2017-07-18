import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PurchaseProvider {

private _purchases: Array<Purchase> = null;

constructor(public _http: Http) {
        console.log('Hello PurchaseProvider Provider');
    }
    
    /**
     * Salva un purchase sul server
     */
    savePurchase(purchase: Array<Purchase>): Promise<any> {
            return this._createPurchase(purchase);
        }
    /**
     * Crea un nuovo purchase sul server
     */
    private _createPurchase(purchase: Array<Purchase>) {
        return new Promise((resolve, reject) => {
            this._http.post('api/purchases/create', {
                email: purchase.email,
                qrcode: purchase.qrcode,
                screeningseatid: purchase.screeningseatid
            })
                .toPromise()
                .then((res: Response) => {
                    const json = res.json() as ResponseServer;
                    if (json.result) {
                        resolve();
                    } else {
                        reject();
                    }
                })
                .catch(() => {
                    reject();
                });
        });
    }

}