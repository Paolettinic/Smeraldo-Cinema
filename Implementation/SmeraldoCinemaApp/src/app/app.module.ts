import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TicketsPage } from '../pages/tickets/tickets';
import { InfoPage } from '../pages/info/info';
import { FilmPage } from '../pages/film/film';
import { TabsPage } from '../pages/tabs/tabs';
import { FilminfoPage } from '../pages/filminfo/filminfo';
import { PaymentPage } from '../pages/payment/payment';
import { CodesPage } from '../pages/codes/codes';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TicketsPage,
    InfoPage,
    FilmPage,
    TabsPage,
    FilminfoPage,
    PaymentPage,
    CodesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TicketsPage,
    InfoPage,
    FilmPage,
    TabsPage,
    FilminfoPage,
    PaymentPage,
    CodesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
