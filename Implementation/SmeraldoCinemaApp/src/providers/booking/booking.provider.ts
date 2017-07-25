import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//Models
import {Booking} from '../../models/booking.model';

@Injectable()
export class BookingProvider {

//private _bookings: Array<Booking> = null;
    
    constructor(private _http: Http) {
        console.log('Hello BookingProvider Provider');
    }
    
    /**
     * Salva un booking sul server
     */
    public _saveBookings(bookings: Array<Booking>): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._http.post('api/bookings/create', bookings).toPromise().then((res: Response) => {
                    const json = res.json() as boolean;
                    resolve(json);
                })
                .catch(() => {
                    reject();
                });
        });
    }
         
    /**
     * Controllo sul booking
     */    
    public _checkBookings(bookings: Array<Booking>): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._http.post('api/bookings/check', bookings).toPromise().then((res: Response) => {
                    const json = res.json() as boolean;
                    resolve(json);
                })
                .catch(() => {
                    reject();
                });
        });
    }
   
}