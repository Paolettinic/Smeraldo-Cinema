export class Seat{
  seat : string = "";
  screening : string = "";

  set(obj?: any){
    if(obj){
      this.seat = obj.seat || this.seat;
      this.screening = obj.screening || this.screening;
    }
  }
}