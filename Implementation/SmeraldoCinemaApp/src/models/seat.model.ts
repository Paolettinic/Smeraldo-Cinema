 
 
 
 export class Seat{
    
    public id : number = -1;
    public number : number = -1;
    public row : string = "";
    
    constructor(obj?: any){
      this.set(obj);
    }
      
    set(obj?: any){
      if(obj){
	this.id = (typeof obj.id === "number") ? obj.id : this.id ;
	this.row = obj.row || this.row;
	this.number = (typeof obj.number === "number") ? obj.number : this.number ;
      }
    }
  }