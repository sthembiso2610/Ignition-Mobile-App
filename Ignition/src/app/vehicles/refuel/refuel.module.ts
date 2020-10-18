import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RefuelPageRoutingModule } from './refuel-routing.module';

import { RefuelPage } from './refuel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RefuelPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RefuelPage]
})
export class RefuelPageModule {}
