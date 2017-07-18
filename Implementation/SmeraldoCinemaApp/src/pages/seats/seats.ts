import { Component } from '@angular/core';
import { SeatProvider} from '../../providers/seat/seat.provider'
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Seat } from '../../models/seat.model';
import { Purchase } from '../../models/purchase.model';

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
  
  purchasedseats :  Array<Seat> = [];
  bookedseats :  Array<Seat> = [];
  selectedseats : Array<Seat> = [];
  
  days : string[] = ["15/07","16/07","17/07","18/07","19/07",""];
  times : string[] = [];
  idfilm : number = 1;
  //choose : string = "booking";

  
  sala : number = 1;
  cols : number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  rows : string[] = ['A','B','C','D','E','F','G','H','I','J','K','L'];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public sSeats: SeatProvider) {
      this.sSeats.getPurchasedSeats().then(purchasedSeats => {
	this.purchasedseats = purchasedSeats;
	for(let seat of this.purchasedseats){
	  this.setPurchasedSeat(seat);
	}
	this.sSeats.getBookedSeats().then(bookedSeats => {
	  this.bookedseats = bookedSeats;
	  for(let bseat of this.bookedseats){
	    this.setBookedSeat(bseat);
	  }
	});
      });      
            
  }
  
  selectSeat(r,c){
    let button = document.getElementById(r+c);
    if(button.classList.contains('booked')) return;
    if(button.classList.contains('purchased')) return;
    if(!this.selectedseats.some(x => x == (r+c))){
      this.selectedseats.push(r+c);
      button.classList.add("selected");
    }
    else{
      let index: number = this.selectedseats.indexOf(r+c);
      this.selectedseats.splice(index,1);
      button.classList.remove("selected");
    }
    console.log(r+c);
    console.log(this.selectedseats); 
  }
  
  setBookedSeat(s){
    console.log(s);
    let seat = document.getElementById(""+s.row+s.number);
    seat.classList.add('booked');
  }
  
  setPurchasedSeat(s){
    console.log(s);
    let seat = ""+s.row+s.number;
    document.getElementById(seat).classList.add('purchased');
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SeatsPage');
  }

}
