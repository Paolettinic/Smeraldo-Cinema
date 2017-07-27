export class Ticket {
    
    public code: string = "";
    public day: string = "";
    public hour: string = "";
    public ispurchased: boolean= false;
    public poster: string = ""; 
    public qrcode: string = "";
    public seat : string = "";
    public title: string = "";
    
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