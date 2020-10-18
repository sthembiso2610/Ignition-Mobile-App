import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AgendaService, 
  DayService, 
  EventSettingsModel,
   MonthAgendaService,
    MonthService, 
    TimelineMonthService, 
    TimelineViewsService, 
    TimeScaleModel, 
    WeekService,
     WorkWeekService,
     PopupOpenEventArgs,
    } from '@syncfusion/ej2-angular-schedule';
import { Appointment } from 'src/model/appointment.model';
import { DbService } from '../db.service';

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
  allAppointments: Appointment[]= []

  public eventSettings: EventSettingsModel 
  //public localAppointments: Appointment[] = [];
  public showQuickInfo: Boolean = false;

  tempstart: any
  tempend: any
  constructor( private db: DbService, public alertController: AlertController, private router: Router) {
    this.allAppointments = []
    this.db.getAllAppointments().forEach(z=>
      {
        
        z.forEach(
          zz=> {
            let app: Appointment =  zz.payload.doc.data();
            app.id =  zz.payload.doc.id;
            this.tempstart = app.StartTime.toJSON();
            app.StartTime = new Date(this.tempstart.seconds * 1000)
            this.tempend = app.EndTime.toJSON();
            app.EndTime = new Date(this.tempend.seconds * 1000)
            console.log(app)
            this.allAppointments.push(app)
          }
        )
       
      })
      this.eventSettings = {
        dataSource: this.allAppointments
      } 
      console.log('constructor datasource',this.eventSettings.dataSource)

    }
   

 

  ngOnInit() {
   
    console.log('in ngonint', this.allAppointments)
   this.eventSettings = {
    dataSource: this.allAppointments
  } 
  console.log(this.eventSettings.dataSource)
     
  }

  async onPopupOpen(args: PopupOpenEventArgs)
  {
    if(this.db.user.empType == '1') {
      args.cancel = true
      let signatureStatus: boolean = false;
      if( Object.keys((<Appointment>args.data)).length <= 8)
      {
  
      }
    if( (<Appointment>args.data).EndTime >=  new Date(Date.now() - 60* 60* 1000) && (<Appointment>args.data).StartTime <=  new Date(Date.now()) )
    {
         signatureStatus = true
    }
     {
     let alert = await this.alertController.create(
       {
         header: 'Appointment with ' + (<Appointment>args.data).client.name,
         message: 'Address: '+ (<Appointment>args.data).client.address.formatted +
         "\n" + 'Licence Code:  Code' +  (<Appointment>args.data).client.licence
         + "\n" + "from: " + (<Appointment>args.data).StartTime.getHours() + ":" +
         (<Appointment>args.data).StartTime.getMinutes() + "0"
           +"\n" + " To: " +
         (<Appointment>args.data).EndTime.getHours() + ":" + (<Appointment>args.data).EndTime.getMinutes() +"0" ,
          buttons:[
            {
              text: 'Sign',
              handler: (x)=>
              {
                console.log('condirm')
              this.router.navigateByUrl('/signature')
              }
            },
               {
                 text: 'Cancel',
                 handler: (x)=>
                 {
                   console.log('cancelled')
                 }
               } 
          ]
       }
     )
     alert.present()
     
    //  .then(result=>
    //    {
    //      if(result.isConfirmed)
    //      {
    //        this.db.tempAppoint = (<Appointment>args.data)
    //        this.route.navigateByUrl('/dashboard/sign')
 
    //      }
    //    })
    //  }
 
 
   }
  }
}

  onAction()
  {
	  
  }

}
