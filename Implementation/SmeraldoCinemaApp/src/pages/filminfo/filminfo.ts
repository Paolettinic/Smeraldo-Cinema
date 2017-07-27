import { Component } from '@angular/core';
import { NavController, NavParams, FabContainer } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

//Models
import {Film} from '../../models/film.model';

//Providers
import {FilmProvider} from '../../providers/film/film.provider';

//Pages
import { SeatsPage } from '../seats/seats';

@Component({
    selector: 'page-filminfo',
    templateUrl: 'filminfo.html',
})
export class FilminfoPage {
    
    film = new Film; //Film relativo alla pagina
    filmtype : string = ""; //Tipologia di film (oggi, settimana e in arrivo)
    trailer : SafeResourceUrl; //Trailer convertito in safe
    days : Array<string>; //Array per visualizzare i giorni
    hours : Array<string>; //Array per visualizzare gli orari
    newscreenings : Array<Array<string>>; //Array doppio per strutturare in modo corretto le proiezioni

    constructor(public navCtrl: NavController, public navParams: NavParams, public sFilm: FilmProvider, public sanitizer: DomSanitizer) {
        
        
        
        var filmid = this.navParams.get('id'); //Recupero l'id del film da dover visualizzare
        this.filmtype = this.navParams.get('filmtype'); //Recupero la tipologia di film
        
        this.sFilm.getFilm(filmid).then(film => { //Recupero il film
            this.film = film; //Lo inizializzo
            this.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(this.film.trailer); //Modifico l'url del trailer e lo rendo safe
            
            //Gestisco gli screenings
            this.days = new Array();
            this.hours = new Array();
            
            //Inizializzo un array bidimensionale di 7 giorni
            this.newscreenings = new Array();
            for(var x: number = 0; x < 7; x++) {
                this.newscreenings[x] = [];
            }
            
            //Gestisco gli screenings nela struttura dati
            for (var i = 0; i < this.film.screenings.length; i++) {
                for (var j = 0; j < this.newscreenings.length; j++) {
                    if(this.newscreenings[j][0] == this.film.screenings[i].day) {
                        this.newscreenings[j].push(this.film.screenings[i].hour);
                        break;
                    }
                    else if (this.newscreenings[j][0] == undefined) {
                        this.newscreenings[j][0] = this.film.screenings[i].day;
                        this.newscreenings[j].push(this.film.screenings[i].hour);
                        break;
                    }
                }
            }
            //Inizializzo days
            for (var k = 0; k < 7; k++) {
                if (this.newscreenings[k][0] == undefined) break;
                this.days.push(this.newscreenings[k][0]);
            }
            
            //Inizializzo hour
            for (var y = 1; y < this.newscreenings[0].length; y++) {
                this.hours.push(this.newscreenings[0][y]);
            }
        });
        
    }

    ionViewDidEnter() {
        console.log('ionViewDidLoad FilminfoPage');
        if (this.filmtype != "comingsoon") {
            //Inizializzo il bottone nel primo giorno di verde
            var firstbutton = this.days[0];
            var button = document.getElementById(firstbutton);
            button.classList.add("primary");
        }
    }
    
    changehours (id) {
        for (var i = 0; i < this.days.length; i++) {
            if (this.days[i] != id) {
                var extbutton = document.getElementById(this.days[i]);
                extbutton.classList.remove("primary");
                extbutton.classList.add("light_grey");
            }  
        }
        var button = document.getElementById(id);
        button.classList.remove("light_grey");
        button.classList.add("primary");
        //Cambio il valore dell'array hours
        for (var j = 0; j < this.newscreenings.length; j++) {
            this.hours = [];
            if (this.newscreenings[j][0] == id) {
                for (var k = 1, y = 0; k < this.newscreenings[j].length; k++, y++) {
                    this.hours[y] = this.newscreenings[j][k];
                }
                break;
            }
        }
        
    }
    
    purchase(id, fab: FabContainer) {
        var scelta = "purchase";
        var film = this.film;
        var newscreenings = this.newscreenings;
        this.navCtrl.push(SeatsPage, {film, scelta, newscreenings});
        fab.close();
    }
    
    booking(id, fab: FabContainer) {
        var scelta = "booking";
        var film = this.film;
        var newscreenings = this.newscreenings;
        this.navCtrl.push(SeatsPage, {film, scelta, newscreenings});
        fab.close();
    }

}
