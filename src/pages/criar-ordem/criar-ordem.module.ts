import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarOrdemPage } from './criar-ordem';

@NgModule({
  declarations: [
    CriarOrdemPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarOrdemPage),
  ],
  exports: [
    CriarOrdemPage
  ]
})
export class CriarOrdemPageModule {}
