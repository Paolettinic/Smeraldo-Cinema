import { ScreeningSeat } from 'screeningseat.model';

export class Purchase{
  
  id : ScreeningSeat = null
  mail : string = "";
  qrcode : string = "";


  set(obj?: any){
    if(obj){
      this.id = obj.id || this.id;
      this.mail = obj.mail || this.mail;
      this.qrcode = obj.qrcode || this.qrcode;
    }
  }
  
}

