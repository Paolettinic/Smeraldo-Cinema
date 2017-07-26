import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-codes',
  templateUrl: 'codes.html',
})
export class CodesPage {

    scelta: string = "";
    code: string = "";
    qrcode: string = "";
    
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  this.qrcode = this.navParams.get('qrcode');
  this.code = this.navParams.get('code');
  this.scelta = this.navParams.get('acquistato');
  //console.log(this.qrcode);
  //console.log(this.code);
  console.log(this.scelta);
  console.log(this.qrcode);
  console.log(this.code);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodesPage');
  }

}
