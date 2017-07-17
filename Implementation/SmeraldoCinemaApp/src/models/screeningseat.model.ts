export class ScreeningSeat{
  
  seat : Seat = null;
  screening : Screening = null; 
  
  set(obj? : any){
    if(obj){
      this.seat = obj.seat || this.seat;
      this.screening = obj.screening || this.screening;
    }
  }
}

