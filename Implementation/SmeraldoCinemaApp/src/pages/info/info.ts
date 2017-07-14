import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {

    info : string = "biglietti";

    constructor(public navCtrl: NavController) {}

}
