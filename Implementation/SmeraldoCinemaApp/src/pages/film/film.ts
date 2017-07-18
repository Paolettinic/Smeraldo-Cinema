import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Pages
import { FilminfoPage } from '../filminfo/filminfo';

//Providers
import {FilmProvider} from '../../providers/film/film.provider';

//Models
import {Film} from '../../models/film.model';

@Component({
  selector: 'page-film',
  templateUrl: 'film.html'
})
export class FilmPage {

    pushPage: any;
    film : string = "oggi";
    
    dailyfilms: Array<Film> = [];
    weeklyfilms: Array<Film> = [];
    comingsoonfilms: Array<Film> = [];
    
    constructor(public navCtrl: NavController, public sFilm: FilmProvider) {
        
            //this.pushPage = FilminfoPage;
        // Recupero i film giornalieri, settimanali e in arrivo
        this.sFilm.getDailyFilms().then(dailyfilms => {this.dailyfilms = dailyfilms});
        this.sFilm.getWeeklyFilms().then(weeklyfilms => {this.weeklyfilms = weeklyfilms});
        this.sFilm.getCoomingSoonFilms().then(comingsoonfilms => {this.comingsoonfilms = comingsoonfilms});
        
    }
    
    dailyfilminfo (id) {
        var filmtype = "daily";
        this.navCtrl.push(FilminfoPage, {id, filmtype});
    }
    
    weeklyfilminfo (id) {
        var filmtype = "weekly";
        this.navCtrl.push(FilminfoPage, {id, filmtype});
    }
    
    comingsoonfilminfo (id) {
        var filmtype = "comingsoon";
        this.navCtrl.push(FilminfoPage, {id, filmtype});
    }

}
