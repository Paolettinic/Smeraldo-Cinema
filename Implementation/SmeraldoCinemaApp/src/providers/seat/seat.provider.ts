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
  private _seat: Seat = null;
  constructor(private _http: Http) {
    console.log('Hello SeatProvider Provider');
  }

  getPurchasedSeats(screen : number): Promise < Array<Seat> > {
    
    return new Promise((resolve) => {
	this._purchasedseats = [];
	this._http.get('api/purchases/'+screen).toPromise()
	  .then((res: Response) => {
	    const purchases = res.json() as Array<Purchase>;
	    for (let purchase of purchases) {
	      this._purchasedseats.push(new Seat(purchase.id.seat));
	    }
	    resolve(this._purchasedseats);
	  })
	  .catch(() => resolve(this._purchasedseats));
    });
  }
  
  getBookedSeats(screen : number): Promise < Array<Seat> > {
    
    return new Promise((resolve) => {
	this._bookedseats = [];
	this._http.get('api/bookings/'+screen).toPromise()
	  .then((res: Response) => {
	    const bookings = res.json() as Array<Booking>;
	    for (let booking of bookings) {
	      this._bookedseats.push(new Seat(booking.id.seat));
	    }
	    resolve(this._bookedseats);
	  })
	  .catch(() => resolve(this._bookedseats));
    });
  }
  
  getSeatByRowColTheater(row : string, col: string, theater: number): Promise<Seat>{
    return new Promise((resolve) => {
	this._http.get('api/seats/'+row+'/'+col+'/'+theater).toPromise()
	  .then((res: Response) => {
	    const s = res.json() as Seat;
	    this._seat = s;
	    resolve(this._seat);
	  })
	  .catch(() => resolve(this._seat));
    });
  }
}
