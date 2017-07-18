import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//Models
import {Ticket} from '../../models/ticket.model';

@Component({
    selector: 'page-tickets',
    templateUrl: 'tickets.html'
})
export class TicketsPage {
    
    tickets: Array<Ticket> = [];
    
constructor(public navCtrl: NavController, public alertCtrl: AlertController, private storage: Storage) {
    
        this.storage.get('tickets')
        .then((value) => {
        this.tickets = value;
        });
    }
    
    showAlert() {
    let alert = this.alertCtrl.create({
      title: 'CT56',
      subTitle: 'Puoi presentare questo codice al botteghino per acquistare i biglietti che hai prenotato!',
      buttons: ['OK']
    });
    alert.present();
    }
    
    showAlertUno() {
    let alert = this.alertCtrl.create({
      title: '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png">',
      subTitle: "Puoi presentare questo codice direttamente all'ingresso in sala!",
      buttons: ['OK']
    });
    alert.present();
    }
  }