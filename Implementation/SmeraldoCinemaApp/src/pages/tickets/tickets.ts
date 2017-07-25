import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

//Models
import {Ticket} from '../../models/ticket.model';
//Pages
import { PaymentPage } from '../payment/payment';

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
    
    showAlert(isp : boolean, qrc: string, cod: string) {
        if (isp) {
            let alert = this.alertCtrl.create({
            title: qrc,
            subTitle: "Puoi presentare questo codice direttamente all'ingresso in sala!",
            buttons: ['OK']
            });
            alert.present();
        }
        else {
          let alert = this.alertCtrl.create({
          title: cod,
          subTitle: 'Puoi presentare questo codice al botteghino per acquistare i biglietti che hai prenotato!',
          buttons: ['OK']
          });
          alert.present();
        }
    }
    
  }