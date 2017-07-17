import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//Models
import { Seat } from '../../models/seat.model';

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
	this._http.get('api/purchases/'+this._screening).toPromise()
	  .then((res: Response) => {
	    /*const seats = res.json() as Array<Seat>;
	    for (let seat of seats) {
	      this._purchasedseats.push(new Seat(seat));
	    }*/
	    this._purchasedseats = res.json();
	    console.log(this._purchasedseats);
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
	this._http.get('api/purchases/'+this._screening).toPromise()
	  .then((res: Response) => {
	    /*const seats = res.json() as Array<Seat>;
	    for (let seat of seats) {
	      this._bookedseats.push(new Seat(seat));
	    }*/
	    this._bookedseats = res.json();
	    resolve(this._bookedseats);
	  })
	  .catch(() => resolve(this._bookedseats));
      } else {
	resolve(this._bookedseats);
      }
    });

  }
}
