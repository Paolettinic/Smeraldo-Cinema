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
        var t : Ticket;
        this.storage.ready().then(() => {
            //this.storage.clear();
            this.storage.get('tickets')
                    .then((value) => {
                        console.log(value);
                if(value !== null) {
                    let date= new Date();
                    let today = date.getDate() < 10 ? "0"+date.getDate() : date.getDate() ;
                    let month = (date.getMonth() + 1) < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1 ;
                    let hour = (date.getHours()+1) < 10 ? "0"+(date.getHours()+1) : (date.getHours()+1) ;
                    let minute = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes() ;
                    hour = hour+':'+minute;
                    today = today+'/'+month;
                    console.log(today+' '+month+' '+hour+' '+minute);
                    for(let ticket of value){
                        t = new Ticket(ticket);
                        if(t.day>=today && t.hour>hour)  this.tickets.push(t);
                    }
                    console.log(this.tickets);
                }
            });
        });
    }
    
    showAlert(isp : boolean, qrc: string, cod: string) {
        if (isp) {
            let alert = this.alertCtrl.create({
                title: "Questo è il tuo biglietto",
                subTitle: "<img src='"+qrc+"'><br>Puoi presentare questo codice direttamente all'ingresso in sala!",
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
    
//    ionViewDidLeave() {
//        this.navCtrl.pop();
//    }
    
}