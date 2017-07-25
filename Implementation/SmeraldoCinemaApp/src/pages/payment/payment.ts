import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CodesPage } from '../codes/codes';
import { Storage } from '@ionic/storage';
import { ItemSliding } from 'ionic-angular';

//Models
import {PaymentPP} from '../../models/paymentPP.model';
import {PaymentCC} from '../../models/paymentCC.model';
import {Seat} from '../../models/seat.model';
import {ScreeningSeat} from '../../models/screeningseat.model';
import {Purchase} from '../../models/purchase.model';
import {PurchaseProvider} from '../../providers/purchase/purchase.provider';
import {Screening} from '../../models/screening.model';
import {Film} from '../../models/film.model';
import {Ticket} from '../../models/ticket.model';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

    scelta : string = "acquisto";
    qrcode : string = "";
    
    paymentsPP: Array<PaymentPP> = [];
    paymentsCC: Array<PaymentCC> = [];
       
    listofpayments: string ="";
    email: string = "";
    
    purchases : Array<Purchase> = [];  
    film : Film;
    ticket : Ticket;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public sPurchase: PurchaseProvider, public storage: Storage) {
        
    this.storage.get('paymentsPP')
    .then((value) => {
        if(value === null)
            this.paymentsPP = [];
        else
            this.paymentsPP = value;
    });

    this.storage.get('paymentsCC')
    .then((value) => {
        if(value === null)
            this.paymentsCC = [];
        else
            this.paymentsCC = value;
    });
          
    this.film = this.navParams.get('film');
    this.purchases = this.navParams.get('purchases');
        
    var year = "2017";
    var date = "03/11" + year;
    var newdate = date.split("/").reverse().join("-");
    
  }
       
  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }
  
  popupPP() {
    this.alertCtrl.create({
    title: 'Inserisci i dati',
      inputs: [
        {
          name: "email",
          placeholder: 'Indirizzo email'
        },
        {
          name: "password",
          placeholder: 'Password',
          type:'password'
        },
      ],
      buttons: [
        {
          text: 'Cancella',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salva',
          handler: data => {
        if(data.email =="" || data.password==""){
            return false;}
        else
            this.savePaymentPP(data.email,data.password);
          }
        }
      ]
    }).present();
  }
  
  getPay(pay : string){
    for(let p of this.paymentsPP){
      if(p.email === pay) return p;
    }
  }
  
  savePayment(){
        this.sPurchase._checkPurchases(this.purchases).then(result1 => 
        {
            if (result1 == false) {
                this.purchasesNotValid();
                return false;
            }
            else {
        this.sPurchase._savePurchases(this.purchases)
                    .then(value => {
                    this.qrcode = value;
                    let s : string ="";
                    let t : Ticket;
                    let tickets: Array<Ticket> = [];
                    this.storage.get('tickets').then((value) => {
                        if (value === null)
                            tickets = [];
                        else
                            tickets = value;
                        for (let purchase of this.purchases){
                            s = s+purchase.id.seat.number+purchase.id.seat.row+", "; 
                        }
                        t = new Ticket ({title:this.film.title,poster:this.film.poster,seat:s,day:this.purchases[0].id.screening.day,hour:this.purchases[0].id.screening.hour,qrcode:this.qrcode,ispurchased:true});
                        tickets.push(t);
                        this.storage.set('tickets',tickets);
                        let acquistato = this.scelta;
                        let qr = this.qrcode;
                        this.navCtrl.push(CodesPage, {qr, acquistato});
                    });
                });
            }
        });
  }
  
  savePaymentPP(e: string, p: string) {
        let paymn= new PaymentPP({email:e,password:p});
        this.paymentsPP.push(paymn);
        this.storage.set('paymentsPP',this.paymentsPP);
  }
        
   deletePaymentPP(pay: PaymentPP, sliding: ItemSliding) {
        sliding.close();
        this.storage.get('payments').then((value) => {this.paymentsPP = value});
        let index: number = this.paymentsPP.indexOf(pay);
    if (index !== -1) {
        this.paymentsPP.splice(index, 1);
    }
        this.storage.set('payments', this.paymentsPP);
   }

  popupCC() {
    this.alertCtrl.create({
    title: 'Inserisci i dati',
      inputs: [
        {
          name: "carta",
          placeholder: 'Titolare carta'
        },
        {
          name: "numero",
          placeholder: 'Numero carta'
        },
        {
          name: "data",
          placeholder: 'mm/dd'
        },
        {
          name: "cvc",
          placeholder: 'CVC'
        },
        {
          name: "email",
          placeholder: 'Indirizzo email'
        },
      ],
      buttons: [
        {
          text: 'Cancella',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salva',
          handler: data => {
        if(data.carta =="" || data.numero==""){
            return false;}
        else
            this.savePaymentCC(data.carta,data.numero);
          }
        }
      ]
    }) .present();
  }
        
    savePaymentCC(c: string, n: string) {
        let paymnt= new PaymentCC({carta:c,numero:n});
        this.paymentsCC.push(paymnt);
        this.storage.set('paymentsCC',this.paymentsCC);
    }
        
    deletePaymentCC(pay: PaymentCC, sliding: ItemSliding) {
        sliding.close();
        this.storage.get('payments').then((value) => {this.paymentsCC = value});
        let index: number = this.paymentsCC.indexOf(pay);
        if (index !== -1) {
            this.paymentsCC.splice(index, 1);
        }
        this.storage.set('payments', this.paymentsCC);
   }
        
    disabled(mail: string){
        let accept = document.getElementById('bottone');
        accept.removeAttribute('disabled');
        this.email = mail;
        }
   
    purchasesNotValid() {
        this.alertCtrl.create({
            title: 'Attenzione',
            subTitle: 'I posti scelti sono gia occupati. Selezionane di nuovi nella mappa della sala.',
            buttons: ['OK']
            }) .present();
        }
}
