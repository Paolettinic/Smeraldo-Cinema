import { ScreeningSeat } from '../models/screeningseat.model';


export class Booking{
  
  public id : ScreeningSeat = null;
  public code : string = "";
  
  constructor(obj?: any){
    this.set(obj);
  }

  set(obj?: any){
    if(obj){
      this.id = obj.id || this.id;
      this.code = obj.code || this.code;
    }
  }
  
}



