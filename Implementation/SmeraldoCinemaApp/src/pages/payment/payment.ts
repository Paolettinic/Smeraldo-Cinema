import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CodesPage } from '../codes/codes';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

    pushPage: any;
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  this.pushPage = CodesPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }
  
  showPromptPP() {
    let prompt = this.alertCtrl.create({
    title: 'Inserisci i dati',
      inputs: [
        {
          name: 'email',
          placeholder: 'Indirizzo email'
        },
        {
          name: 'password',
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
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  
  showPromptCC() {
    let prompt = this.alertCtrl.create({
    title: 'Inserisci i dati',
      inputs: [
        {
          name: 'carta',
          placeholder: 'Titolare carta'
        },
        {
          name: 'numero',
          placeholder: 'Numero carta'
        },
        {
          name: 'data',
          placeholder: 'mm/dd'
        },
        {
          name: 'cvc',
          placeholder: 'CVC'
        },
        {
          name: 'email',
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
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}
