import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//Models 
import {Film} from '../../models/film.model';

@Injectable()
export class FilmProvider {

    private _dailyfilms: Array<Film> = null;
    private _weeklyfilms: Array<Film> = null;
    private _comingsoonfilms: Array<Film> = null;

    constructor(public _http: Http) {
        console.log('Hello FilmProvider Provider');
    }

    //Recupera i film giornalieri dal server.
    getDailyFilms(): Promise<Array<Film>> {
        return new Promise((resolve) => {
            if (this._dailyfilms === null) {
                this._dailyfilms = [];
                this._http.get('api/films/daily').toPromise()
                    .then((res: Response) => {
                        const films = res.json() as Array<Film>;
                        for (let film of films) {
                            this._dailyfilms.push(new Film(film));
                        }
                        resolve(this._dailyfilms);
                    })
                    .catch(() => resolve(this._dailyfilms));
            } else {
                resolve(this._dailyfilms);
            }
        });
    }

    //Recupera i film settimanali dal server.
    getWeeklyFilms(): Promise<Array<Film>> {
        return new Promise((resolve) => {
            if (this._weeklyfilms === null) {
                this._weeklyfilms = [];
                this._http.get('api/films/weekly').toPromise()
                    .then((res: Response) => {
                        const films = res.json() as Array<Film>;
                        for (let film of films) {
                            this._weeklyfilms.push(new Film(film));
                        }
                        resolve(this._weeklyfilms);
                    })
                    .catch(() => resolve(this._weeklyfilms));
            } else {
                resolve(this._weeklyfilms);
            }
        });
    }
       
    //Recupera i film in arrivo dal server.
    getCoomingSoonFilms(): Promise<Array<Film>> {
        return new Promise((resolve) => {
            if (this._comingsoonfilms === null) {
                this._comingsoonfilms = [];
                this._http.get('api/films/comingsoon').toPromise()
                    .then((res: Response) => {
                        const films = res.json() as Array<Film>;
                        for (let film of films) {
                            this._comingsoonfilms.push(new Film(film));
                        }
                        resolve(this._comingsoonfilms);
                    })
                    .catch(() => resolve(this._comingsoonfilms));
            } else {
                resolve(this._comingsoonfilms);
            }
        });
    }
}
