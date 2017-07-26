import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { SeatProvider} from '../../providers/seat/seat.provider'
import { PurchaseProvider} from '../../providers/purchase/purchase.provider'
import { BookingProvider} from '../../providers/booking/booking.provider'

import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
import { CodesPage } from '../codes/codes';
import { ScreeningSeat } from '../../models/screeningseat.model';
import { Screening } from '../../models/screening.model';
import { Seat } from '../../models/seat.model';
import { Ticket } from '../../models/ticket.model';
import { Film } from '../../models/film.model';
import { Purchase } from '../../models/purchase.model';
import { Booking } from '../../models/booking.model';

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
  
  selectedseats : Array<string> = [];
  selectedScreeningID : number = -1;
  selectedScreening : Screening ;
  selectedDay : string = '';
  selectedHour : string = '';
  
  
  purchasedseats :  Array<Seat> = [];
  bookedseats :  Array<Seat> = [];
  
  
  days : string[] = [];
  hours : string[] = [];
  
  /*  nav params  */
  film : Film  = null;
  choose : string = "booking"; // o purchase
  screenings : Array<Array<string>> = [];

  sala : number = 1;
  cols : number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  rows : string[] = ['A','B','C','D','E','F','G','H','I','J','K','L'];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public sSeats: SeatProvider, public sPurchase: PurchaseProvider, public sBooking: BookingProvider, public storage: Storage) {
      this.film = this.navParams.get('film');
      this.choose = this.navParams.get('scelta');
      console.log(this.choose);
      this.screenings = this.navParams.get('newscreenings');
      this.selectedScreening = new Screening(this.film.screenings[0]);
      this.setInitialScreening();
      
      this.sSeats.getPurchasedSeats(this.film.screenings[0].id).then(purchasedSeats => {
	this.purchasedseats = purchasedSeats;
	
	this.sSeats.getBookedSeats(this.film.screenings[0].id).then(bookedSeats => {
	  this.bookedseats = bookedSeats;
	});
      });   
            
  }
  

  
  ionViewDidEnter() {
    console.log('ionViewDidEnter FilminfoPage');
    var button = document.getElementById("p"+this.days[0]);
    button.classList.add("primary");
    button = document.getElementById("p"+this.hours[0]);
    button.classList.add("primary");
    for(let seat of this.purchasedseats){
      this.setPurchasedSeat(this.seatToString(seat));
    }
    for(let bseat of this.bookedseats){
	this.setBookedSeat(this.seatToString(bseat));
    }
    this.selectedDay=this.days[0];
  }
  
  setScreening(screen_num : number){    
    this.sSeats.getPurchasedSeats(screen_num).then(purchasedSeats => {
      this.purchasedseats = purchasedSeats;
      this.sSeats.getBookedSeats(screen_num).then(bookedSeats => {
        this.bookedseats = bookedSeats;
	this.refresh();
	for(let seat of this.purchasedseats){
	  this.setPurchasedSeat(this.seatToString(seat));
	}
	for(let bseat of this.bookedseats){
	  this.setBookedSeat(this.seatToString(bseat));
	}
      });
    });   
  }
  
  
  refresh(){
    
    let sel = document.getElementsByClassName('selected');
    while(sel.length>0)
      sel[0].classList.remove('selected');
  
    let pur = document.getElementsByClassName('purchased');
    while(pur.length>0)
      pur[0].classList.remove('purchased');
    
    let boo = document.getElementsByClassName('booked');
    while(boo.length>0)
      boo[0].classList.remove('booked');

      
    this.selectedseats = [];
    
  }
  
  
  selectScreeningByDateHour(date:string, hour: string, frombutton: boolean){  
    if(frombutton){
      let oldhour = document.getElementById("p"+this.selectedHour);
      console.log("p"+this.selectedHour);
      console.log(oldhour);
      oldhour.classList.remove("primary");
      oldhour.classList.add("light_grey");
      let button = document.getElementById("p"+hour);
      button.classList.remove("light_grey");
      button.classList.add("primary");
    }
    this.selectedHour=hour;
    for(let screen of this.film.screenings){
      if(screen.day == date && screen.hour == hour){
	this.selectedScreening = new Screening(screen);
	console.log(this.selectedScreening);
	this.selectedScreeningID = screen.id;
      }
    }
    this.setScreening(this.selectedScreeningID);
  }
  
  
  setInitialScreening(){
  let i = 1;
    for( i = 0; i < this.screenings.length ; i++){
      if(this.screenings[i][0] == null) continue;
      this.days.push(this.screenings[i][0]);
    }
    for( i = 1; i < this.screenings[0].length ; i++){
      this.hours.push(this.screenings[0][i]);
    } 
    this.selectedDay = this.days[0];
    this.selectedHour = this.hours[0];
    console.log(this.selectedDay);
    console.log(this.selectedHour);
  }
  
  seatToString(s){
    return ""+s.row+s.number;
  }
  
  changehours (id) {
    this.hours = new Array();
    for (var i = 0; i < this.days.length; i++) {
      if (this.days[i] != id) {
	var extbutton = document.getElementById("p"+this.days[i]);
	extbutton.classList.remove("primary");
	extbutton.classList.add("light_grey");
      }  
    }
    var button = document.getElementById("p"+id);
    button.classList.remove("light_grey");
    button.classList.add("primary");
    //Cambio il valore dell'array hours
    for (var j = 0; j < this.screenings.length; j++) {
      if (this.screenings[j][0] == id) {
	for (var k = 1, y = 0; k < this.screenings[j].length; k++, y++) {
	  this.hours[y] = this.screenings[j][k];
	}
	break;
      }
    }
    this.selectedDay = id; 
    this.selectScreeningByDateHour(id,this.hours[0],false);
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
    if(this.selectedseats.length < 1) return; //non serve, ma non si sa mai
    if(this.choose == "booking"){
      var bookings : Array<Booking> = [];
      let seat: Seat;
      let row;
      let col;
      for(let select of this.selectedseats){
	row = select.charAt(0);
	col = select.charAt(1);
	this.sSeats.getSeatByRowColTheater(row,col,this.sala).then(value =>{
	  seat = new Seat(value);
	  let screeningseat = new ScreeningSeat({screening:this.selectedScreening,seat:seat});
	  bookings.push(new Booking({id:screeningseat, qrcode : ""}));
	});
      }
      this.sBooking._checkBookings(bookings).then(result =>{
	if(!result){
	  this.purchasesNotValid();
	  return;
	}
	else{
	  this.sBooking.saveBookings(bookings).then(value =>{
	    let code = value;
	    let scelta = "prenotazione";
	    let s : string ="";
	    let t : Ticket;
	    let tickets: Array<Ticket> = [];
	    this.storage.get('tickets').then((value) => {
	      if (value === null)
		tickets = [];
	      else
		tickets = value;
	      for (let booking of bookings){
		s = s+booking.id.seat.number+booking.id.seat.row+", "; 
	      }
	      t = new Ticket ({title:this.film.title,poster:this.film.poster,seat:s,day:bookings[0].id.screening.day,hour:bookings[0].id.screening.hour,code:code,ispurchased:false});
	      tickets.push(t);
	      this.storage.set('tickets',tickets);
	      let acquistato = scelta;
	    this.navCtrl.push(CodesPage, {code, acquistato});
	    });
	  });
	}
      });
    }
    else{
      var purchases : Array<Purchase> = [];
      let seat: Seat;
      let row;
      let col;
      for(let select of this.selectedseats){
	row = select.charAt(0);
	col = select.charAt(1);
	this.sSeats.getSeatByRowColTheater(row,col,this.sala).then(value =>{
	  seat = new Seat(value);
	  let screeningseat = new ScreeningSeat({screening:this.selectedScreening,seat:seat});
	  purchases.push(new Purchase({id:screeningseat, mail : "", qrcode : ""}));
	});
      }
      this.sPurchase._checkPurchases(purchases).then(result1 => {
	console.log(result1);
	if (result1 == false) {
	  this.purchasesNotValid();
	  return;
	}
	else {
	  let film = this.film;
	  let scelta = "acquisto";
	  this.navCtrl.push(PaymentPage, {film, scelta,purchases});
	}
      });
    }
  }
  
  purchasesNotValid() {
    this.alertCtrl.create({
      title: 'Attenzione',
      subTitle: 'I posti scelti sono già occupati. Selezionane di nuovi nella mappa della sala.',
      buttons: ['OK']
    }) .present();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SeatsPage');

  }

}
