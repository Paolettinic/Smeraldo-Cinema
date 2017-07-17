export class Seat{
  seat : string = "";
  screening : string = "";

  set(obj?: any){
    if(obj){
      this.id = (typeof obj.id === "number") ? obj.id : this.id;
      this.column = (typeof obj.id === "number") ? obj.column : this.column;
      this.row = obj.row || this.row; 
    }
  }
}