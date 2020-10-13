import { Component, OnInit } from '@angular/core';
import { AgendaService, DayService, EventSettingsModel, MonthAgendaService, MonthService, TimelineMonthService, TimelineViewsService, TimeScaleModel, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  providers: [
		DayService,
		WeekService,
		WorkWeekService,
		MonthService,
		AgendaService,
		MonthAgendaService,
		TimelineViewsService,
		TimelineMonthService
	]
})
export class CalendarPage implements OnInit {
  public timeScaleOptions: TimeScaleModel = { enable: true, slotCount: 1 };
  public selectedDate: Date = new Date(Date.now());
  public views: Array<string> = [ 'Day', 'Week', 'WorkWeek', 'Month' ];
  public eventSettings: EventSettingsModel = {
  //	dataSource: this.localAppointments
  };
  //public localAppointments: Appointment[] = [];
  public showQuickInfo: Boolean = false;
  
  
  constructor() { }

 

  ngOnInit() {
  }

  onPopupOpen()
  {

  }

  onAction()
  {
	  
  }

}
