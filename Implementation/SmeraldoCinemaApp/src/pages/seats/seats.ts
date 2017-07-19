import { Component } from '@angular/core';
import { SeatProvider} from '../../providers/seat/seat.provider'
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Seat } from '../../models/seat.model';
import { Film } from '../../models/film.model';
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
  
  /*  nav params  */
  film : Film  = null;
  choose : string = "booking"; // o purchase
  screenings : Array<Array<string>> = [];

  
  sala : number = 1;
  cols : number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  rows : string[] = ['A','B','C','D','E','F','G','H','I','J','K','L'];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public sSeats: SeatProvider) {
      this.film = this.navParams.get('this.film');
      this.choose = this.navParams.get('scelta');
      this.screenings = this.navParams.get('this.screenings');
      this.sSeats.getPurchasedSeats().then(purchasedSeats => {
	this.purchasedseats = purchasedSeats;
	for(let seat of this.purchasedseats){
	  this.setPurchasedSeat(this.seatToString(seat));
	}
	this.sSeats.getBookedSeats().then(bookedSeats => {
	  this.bookedseats = bookedSeats;
	  for(let bseat of this.bookedseats){
	    this.setBookedSeat(this.seatToString(bseat));
	  }
	});
      });      
            
  }
  seatToString(s){
    return ""+s.row+s.number;
  }
  selectSeat(r,c){
    if(this.selectedseats.length >= 20) return;
    let button = document.getElementById(r+c);
    if(button.classList.contains('booked')) return;
    if(button.classList.contains('purchased')) return;
    if(!this.selectedseats.some(x => x == (r+c))){
      document.getElementById("bottone").removeAttribute('disabled');
      this.selectedseats.push(r+c);
      button.classList.add("selected");
    }
    else{
      if(this.selectedseats.length <= 1){
	document.getElementById("bottone").setAttribute('disabled','disabled');
      }
      let index: number = this.selectedseats.indexOf(r+c);
      this.selectedseats.splice(index,1);
      button.classList.remove("selected");
    }
  }
  
  setBookedSeat(s){
    let st = document.getElementById(s);
    st.classList.add('booked');
  }
  
  setPurchasedSeat(s){
    let st = document.getElementById(s) ;
    st.classList.add('purchased');
  }
  doPurchaseBooking(){
    if(this.selectedseats.length < 1) return;
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SeatsPage');
  }

}
