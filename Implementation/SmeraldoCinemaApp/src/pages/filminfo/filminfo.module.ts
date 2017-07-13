import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilminfoPage } from './filminfo';

@NgModule({
  declarations: [
    FilminfoPage,
  ],
  imports: [
    IonicPageModule.forChild(FilminfoPage),
  ],
  exports: [
    FilminfoPage
  ]
})
export class FilminfoPageModule {}
