import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {HttpModule} from '@angular/http';

//Pages
import { TicketsPage } from '../pages/tickets/tickets';
import { InfoPage } from '../pages/info/info';
import { FilmPage } from '../pages/film/film';
import { TabsPage } from '../pages/tabs/tabs';
import { FilminfoPage } from '../pages/filminfo/filminfo';
import { PaymentPage } from '../pages/payment/payment';
import { CodesPage } from '../pages/codes/codes';

//Natives
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Providers
import { FilmProvider } from '../providers/film/film.provider';
import { ScreeningProvider } from '../providers/screening/screening.provider';

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
    HttpModule,
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FilmProvider,
    ScreeningProvider
  ]
})
export class AppModule {}
