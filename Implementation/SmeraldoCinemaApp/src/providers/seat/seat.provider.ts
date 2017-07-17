import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Seat } from '../../models/seat.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the SeatProvider provider.
	 
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SeatProvider {

  private _seats: Array<Seat> = null;

  constructor(private _http: Http, private _screeningid: number) {
    console.log('Hello SeatProvider Provider');
  }

  getPurchasedSeats(): Promise < Array<Seat> > {
    
    return new Promise((resolve) => {
      
      if (this._seats === null) {
	this._seats = [];
	this._http.get('api/purchase/'+this._id).toPromise()
	  .then((res: Response) => {
	    const json = res.json() as Array<Seat>;
	    if (json.result) {
	      const seats = json.data;
	      for (let seat of _seats) {
		this._seats.push(new Seat(seat));
	      }
	      resolve(this._seats);
	    } else {
	      resolve(this._seats);
	    }
	  })

	  .catch(() => resolve(this._seats));
      } else {
	resolve(this._seats);
      }
    });
  }
}
