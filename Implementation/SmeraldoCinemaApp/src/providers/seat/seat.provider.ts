import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//Models
import { Seat } from '../../models/seat.model';
import { Purchase } from '../../models/purchase.model'; 
import { Booking } from '../../models/booking.model'; 
import { ScreeningSeat } from '../../models/screeningseat.model' 

@Injectable()
export class SeatProvider {

  private _purchasedseats: Array<Seat> = null;
  private _bookedseats: Array<Seat> = null;
  private _screening: number = 1;
  constructor(private _http: Http) {
    console.log('Hello SeatProvider Provider');
  }

  getPurchasedSeats(): Promise < Array<Seat> > {
    
    return new Promise((resolve) => {
      
      if (this._purchasedseats === null) {
	this._purchasedseats = [];
	this._http.get('api/purchases/1').toPromise()
	  .then((res: Response) => {
	    const purchases = res.json() as Array<Purchase>;
	    for (let purchase of purchases) {
	      this._purchasedseats.push(new Seat(purchase.id.seat));
	    }
	    resolve(this._purchasedseats);
	  })
	  .catch(() => resolve(this._purchasedseats));
      } else {
	resolve(this._purchasedseats);
      }
    });
  }
  
  getBookedSeats(): Promise < Array<Seat> > {
    
    return new Promise((resolve) => {
      
      if (this._bookedseats === null) {
	this._bookedseats = [];
	this._http.get('api/bookings/4').toPromise()
	  .then((res: Response) => {
	    const bookings = res.json() as Array<Booking>;
	    for (let booking of bookings) {
	      this._bookedseats.push(new Seat(booking.id.seat));
	    }
	    resolve(this._bookedseats);
	  })
	  .catch(() => resolve(this._bookedseats));
      } else {
	resolve(this._bookedseats);
      }
    });

  }
}
