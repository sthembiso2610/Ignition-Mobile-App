import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/model/vehicle.model';
import { DbService } from 'src/service/db.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {

  vehicles: Vehicle[];
  dataSource: Vehicle;
  checkInStatus: boolean;
  cars: Vehicle [] = [];
  outcars: Vehicle [] = [];

  constructor(private service: DbService) { }

  ngOnInit() {

  //   this.service.getAllVehicles().subscribe(a=>
  //     {   this.cars= [];
  //       this.outcars = []
  //         a.forEach(
  //           zz=> {
  //             let car: Vehicle = zz.payload.doc.data()
  //               car.id = zz.payload.doc.id;
  //               console.log(car);
  //               if( car.checkoutby == this.db.User.uid)
  //               {
  //                 this.checkInStatus = true
  //                 this.cars.push(car)
  //                // this.dataSource.data = this.cars;
  //               //  this.dataSource.sort = this.sort;
  //              //   this.dataSource.paginator = this.paginator;
  //               // this.route.navigate(['dashboard/vehicles/Check-InOut']);
  //               }
  //               else{
  
  //              //this.cars = []
  //              if (car.checkoutby == null)
  //              {
  
  
  //                 this.outcars.push(car)
  //                   if(this.cars.length == 0)
  //                   {
  //                     this.checkInStatus = false
  //             //    this.dataSource.data = this.outcars;
  //             //    this.dataSource.sort = this.sort;
  //             //    this.dataSource.paginator = this.paginator;
  //                   }
  //              }
  //              else{
  
  //              }
  //               }
  //               // this.cars.push(car)
  //               // this.dataSource.data = this.cars;
  //               // this.dataSource.sort = this.sort;
  //               // this.dataSource.paginator = this.paginator;
  //           }
  //         )
  //     }
  //   )


   }

}
