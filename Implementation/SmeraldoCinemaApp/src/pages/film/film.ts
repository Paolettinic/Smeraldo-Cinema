import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-film',
  templateUrl: 'film.html'
})
export class FilmPage {

    film : string = "oggi";

    constructor(public navCtrl: NavController) {}

    prova() {
        this.navCtrl.push('FilminfoPage');
    }

}
