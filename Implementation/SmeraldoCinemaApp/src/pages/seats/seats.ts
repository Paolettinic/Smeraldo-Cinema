import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SeatsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-seats',
  templateUrl: 'seats.html',
})
export class SeatsPage {
  
  days : string[] = ['11/03','12/03','13/03','14/03','11/03','12/03','13/03'];
  times : string[] = ['8:30','11:30','13:30'];
  sala : number = 1;
  cols : number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  rows : string[] = ['A','B','C','D','E','F','G','H','I','J','K','L'];
  seats :  Array<string> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      
  }
  
  selectSeat(r,c){
    let button = document.getElementById(r+c);
    if(!this.seats.some(x => x == (r+c))){
      this.seats.push(r+c);
      button.classList.add("selected");
    }
    else{
      let index: number = this.seats.indexOf(r+c);
      this.seats.splice(index,1);
      button.classList.remove("selected");
    }
    console.log(r+c);
    console.log(this.seats); 
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SeatsPage');
  }

}
