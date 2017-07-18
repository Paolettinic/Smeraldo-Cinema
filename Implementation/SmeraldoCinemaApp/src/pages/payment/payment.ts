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
import {Purchase} from '../../models/purchase.model';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

    paymentsPP: Array<PaymentPP> = [];
    paymentsCC: Array<PaymentCC> = [];
        
    seats: Array<Seat> = [];
    purchases: Array<Purchase> = [];
        
    pushPage: any;
    listofpayments: string ="";
        
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private storage: Storage) {
    
    this.pushPage = CodesPage;
        
        this.storage.get('payments')
        .then((value) => {
            if(value === null)
                this.paymentsPP = [];
            else
        this.paymentsPP = value;
        });
            
        this.storage.get('payments')
        .then((value) => {
            if(value === null)
                this.paymentsCC = [];
            else
        this.paymentsCC = value;
        });
        
        let s1 = new Seat({'id':1,'number':1,'row':'A'});
        let s2 = new Seat({'id':1,'number':2,'row':'A'});
        let s3 = new Seat({'id':1,'number':3,'row':'A'});
        this.seats.push(s1);
        this.seats.push(s2);
        this.seats.push(s3);
        
        let screeningseat1 = new ScreaningSeat({s1});
        let screeningseat2 = new ScreaningSeat({s2});
        let screeningseat3 = new ScreaningSeat({s3});
        this.purchases.push(screeningseat1,"alice@alice","hyyfhd");
        this.purchases.push(screeningseat2,"nicolo@nicolo","hygdh");
        this.purchases.push(screeningseat3,"mario@mario","hjdb");

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
          placeholder: 'Password'
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

  savePaymentPP(e: string, p: string) {
        let paymn= new PaymentPP({email:e,password:p});
        this.paymentsPP.push(paymn);
        this.storage.set('payments',this.paymentsPP);
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
        this.storage.set('payments',this.paymentsCC);
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
        
    disabled(){
        let accept = document.getElementById('bottone');
        accept.removeAttribute('disabled');
        
        }
   
}
