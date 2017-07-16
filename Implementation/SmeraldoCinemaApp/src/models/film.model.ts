import {Screening} from './screening.model';

export class Film {
    
    public id: number = -1;
    public title: string = "";
    public director: string = "";
    public actor: string = "";
    public country: string = "";
    public runningTime: number = -1;
    public synopsis: string = "";
    public poster: string = "";
    public recognition: string = "";
    public trailer: string = "";
    public releaseDate: string = "";
    public price: number = -1
    public sale: boolean = false;
    public screenings: Array<Screening> = null;
    
    constructor(obj?: any) {
        this.set(obj);
    }
    
    set(obj?: any) {
        if (obj) {
            this.id = (typeof obj.id === "number") ? obj.id : this.id;
            this.title = obj.title || this.title;
            this.director = obj.director || this.director;
            this.actor = obj.actor || this.actor;
            this.country = obj.country || this.country;
            this.runningTime = (typeof obj.runningTime === "number") ? obj.runningTime : this.runningTime;
            this.synopsis = obj.synopsis || this.synopsis;
            this.poster = obj.poster || this.poster;
            this.recognition = obj.recognition || this.recognition;
            this.trailer = obj.trailer || this.trailer;
            this.releaseDate = obj.releaseDate || this.releaseDate;
            this.price = (typeof obj.price === "number") ? obj.price : this.price;
            this.sale = (typeof obj.sale === 'boolean') ? obj.sale : this.sale;
            this.screenings = obj.screenings || this.screenings;
        }
    }
    
}