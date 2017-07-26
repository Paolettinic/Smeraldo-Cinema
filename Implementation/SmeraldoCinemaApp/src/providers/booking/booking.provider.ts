import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//Models
import {Booking} from '../../models/booking.model';

@Injectable()
export class BookingProvider {

//private _bookings: Array<Booking> = null;
    private _s : any;
    constructor(private _http: Http) {
        console.log('Hello BookingProvider Provider');
    }
    
    /**
     * Salva un booking sul server
     */
     saveBookings(bookings: Array<Booking>): Promise<string> {
       
      return this._http.post('api/bookings/create', bookings)
	  .toPromise()
	  .then((res : Response) => {
	    this._s = res.json();
	    return this._s.text;
	  })
	  .catch((error) => {
	    console.log(error);
	  });
    }
    
    /**
     * Controllo sul booking
     */    
     _checkBookings(bookings: Array<Booking>): Promise<boolean> {
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