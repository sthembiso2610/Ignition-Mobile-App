import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
//import{ScheduleModule} from '@syncfusion/ej2-angular-schedule'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    ScheduleModule
  ],
  declarations: [CalendarPage]
})
export class CalendarPageModule {}
