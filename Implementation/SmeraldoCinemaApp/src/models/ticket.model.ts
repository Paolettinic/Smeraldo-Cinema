export class Ticket {

public title: string = "Titanic";
public day: string = "25/85";
public hour: string = "13:13";
public seat : string = "1A";
public poster: string = "sedrffff";
public ispurchased: boolean= false;
public qrcode: string = "sedfe";
public code: string = "erfrdf";

constructor(obj?: any) {
        this.set(obj);
    }

    set(obj?: any) {
        if (obj) {
        this.title = obj.title || this.title;
        this.day = obj.day || this.day;
        this.hour = obj.hour || this.hour;
        this.seat = obj.seat || this.seat;
        this.poster = obj.poster || this.poster;
        this.ispurchased = (typeof obj.ispurchased === 'boolean') ? obj.ispurchased : this.ispurchased;
        this.qrcode = obj.qrcode || this.qrcode;
        this.code = obj.code || this.code;
        }
    }
    
}