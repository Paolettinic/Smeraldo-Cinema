import { Seat } from '../models/seat.model';

export class ScreeningSeat{
  
  public seat : Seat = null;
  
  constructor(obj?: any){
    this.set(obj);
  }
  
  set(obj? : any){
    if(obj){
      this.seat = obj.seat || this.seat;
    }
  }
}

