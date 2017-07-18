export class PaymentPP {

    public email: string="";
    public password: string="";
    
    constructor(obj?: any) {
        this.set(obj);
    }

    set(obj?: any) {
        if (obj) {
   
            this.email = obj.email || this.email;
            this.password = obj.password || this.password;
        }
    }
}