import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from 'src/app/db.service';
import { RefuelRecord } from 'src/model/RefuelRecord.model';
import { Vehicle } from 'src/model/vehicle.model';

@Component({
  selector: 'app-refuel',
  templateUrl: './refuel.page.html',
  styleUrls: ['./refuel.page.scss'],
})
export class RefuelPage implements OnInit {

  form: FormGroup;
  constructor(  private fb: FormBuilder, private service: DbService, private router: Router) { }
  vehicle: Vehicle
  ngOnInit() {

    this.form = this.fb.group({
      liters: [
      //  this.data.Liters, [Validators.required]
      ],
      KMReading:[

      ]
    })
    this.vehicle = this.service.vehicle
  }


  submit(){
  

      let newRefuel : RefuelRecord = {
        liters: this.form.controls['liters'].value,
        KmReading: this.form.controls['KMReading'].value,
        refuelRecordDate: Date.now(),
        vehicleID: this.vehicle.id
      }
        this.service.Refuel(newRefuel).then(()=>
        this.router.navigateByUrl('/vehicles')
        )
  
  
     

}
}
