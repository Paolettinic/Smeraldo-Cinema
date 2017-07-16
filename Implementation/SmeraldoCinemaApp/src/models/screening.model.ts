export class Screening {
    
    public id: number = -1;
    public day: string = "Ciao";
    public hour: string = "";
    
    constructor(obj?: any) {
        this.set(obj);
    }
    
    set(obj?: any) {
        if (obj) {
            this.id = (typeof obj.id === "number") ? obj.id : this.id;
            this.day = obj.day || this.day;
            this.hour = obj.hour || this.hour;
        }
    }
    
}
