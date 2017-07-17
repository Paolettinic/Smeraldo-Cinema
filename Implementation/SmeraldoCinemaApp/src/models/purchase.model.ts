import { ScreeningSeat } from 'screeningseat.model';

export class Purchase{
  
  id : ScreeningSeat = null
  mail : string = "";
  qrcode : string = "";


  set(obj?: any){
    if(obj){
      this.id = obj.id || this.id
      this.column = (typeof obj.id === "number") ? obj.column : this.column;
      this.row = obj.row || this.row; 
    }
  }
  
}

