import { Seat } from '../models/seat.model';
import { Screening } from '../models/screening.model';

export class ScreeningSeat{
  
  public seat : Seat = null;
  public screening : Screening = null;
  
  constructor(obj?: any){
    this.set(obj);
  }
  
  set(obj? : any){
    if(obj){
      this.seat = obj.seat || this.seat;
      this.screening = obj.screening || this.screening;
    }
  }
}

