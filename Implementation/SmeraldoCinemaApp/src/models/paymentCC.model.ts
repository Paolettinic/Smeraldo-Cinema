export class PaymentCC {

    public carta: string="";
    public numero: string="";

    constructor(obj?: any) {
        this.set(obj);
    }

    set(obj?: any) {
        if (obj) {
   
            this.carta = obj.carta || this.carta;
            this.numero = obj.numero || this.numero;
        }
    }
}