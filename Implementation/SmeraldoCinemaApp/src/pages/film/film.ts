import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FilminfoPage } from '../filminfo/filminfo';

@Component({
  selector: 'page-film',
  templateUrl: 'film.html'
})
export class FilmPage {

    pushPage: any;
    film : string = "oggi";

    constructor(public navCtrl: NavController) {
        this.pushPage = FilminfoPage;  
    }

}
