import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { navigating } from '@syncfusion/ej2-angular-schedule';
import { Vehicle } from 'src/model/vehicle.model';
import { DbService } from '../db.service';
import { RefuelPage } from './refuel/refuel.page';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {

  vehicles: Vehicle[];
  dataSource: Vehicle;
  checkInStatus: boolean = false;
  cars: Vehicle [] = [];
  outcars: Vehicle [] = [];

  constructor(private service: DbService, public alertController: AlertController, private router: Router) { }

  ngOnInit() {

    this.service.getAllVehicles().subscribe(a=>
      {   this.cars= [];
        this.outcars = []
          a.forEach(
            zz=> {
              let car: Vehicle = zz.payload.doc.data()
                car.id = zz.payload.doc.id;
                console.log(car);
                if( car.checkoutby == this.service.user.uid)
                {
                  this.cars= [];
                  this.checkInStatus = true
                  this.cars.push(car)
                 // this.dataSource.data = this.cars;
                //  this.dataSource.sort = this.sort;
               //   this.dataSource.paginator = this.paginator;
                // this.route.navigate(['dashboard/vehicles/Check-InOut']);
                }
                else{
  
               //this.cars = []
               if (car.checkoutby == null  &&  this.checkInStatus == false)
               {
  
                  this.cars.push(car)
                    if(this.cars.length == 0)
                    {
                      this.checkInStatus = false
              //    this.dataSource.data = this.outcars;
              //    this.dataSource.sort = this.sort;
              //    this.dataSource.paginator = this.paginator;
                    }
               }
                }
              }
          )
          console.log('cars',this.cars)
     }
    )

}


   async checkOut(obj: Vehicle)
{

  let alert = await this.alertController.create({
   
    header: 'Confirm',
    message: 'Are you sure you want to check Out this vehicle?',
    buttons:[
      {
        text: 'Yes',
        handler: (x)=>
        {
          console.log('confirmed')
          this.checkInStatus = true;
          obj.inUse = true;
          obj.checkoutby = this.service.user.uid;
          this.service.updateVehicle(obj);
        }
        
      },
      {
        text: 'Cancel',
        cssClass: 'secondary',
        handler: (x)=>
        {
          console.log('cancelled')
        }
      }
    ]
  })
alert.present()
console.log('alert',alert);
}

  async checkIn(obj: Vehicle)
{
  
  let alert = await this.alertController.create({
   
    header: 'Confirm',
    message: 'Are you sure you want to check In this vehicle?',
    buttons:[
      {
        text: 'Yes',
        handler: (x)=>
        {
          console.log('confirmed')
          this.checkInStatus = false;
          obj.inUse = false;
          obj.checkoutby = null;
          this.service.updateVehicle(obj);
        }
        
      },
      {
        text: 'Cancel',
        cssClass: 'secondary',
        handler: (x)=>
        {
          console.log('cancelled')
        }
      }
    ]
  })
alert.present()
console.log('alert',alert);
}

refuel(obj: Vehicle)
{
  this.service.vehicle = obj;
    this.router.navigateByUrl('/vehicles/refuel')
}



}
