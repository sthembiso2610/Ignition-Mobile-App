import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore, User } from 'firebase';
import { switchMap } from 'rxjs/operators';
import { RefuelRecord } from 'src/model/RefuelRecord.model';
import { IGNUser } from 'src/model/user.model';
import { Vehicle } from 'src/model/vehicle.model';
import { AuthService } from './auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DbService {
user: IGNUser= {};
vehicle: Vehicle = {}


  constructor( private afirestore: AngularFirestore,
    private auth: AngularFireAuth) {
    // auth.authState.pipe(

    //   switchMap((asuer)=>
    // {  if(asuer)
    //   {
    //    afirestore.doc(`AllUsers/${asuer.uid}`).get().subscribe(
    //       z=> {this.user = z.data(),
    //       this.user.uid = z.id
    //       }
    //      )
    //   }
    //   else{
    //       return null;
    //   }
    // }
    //   )
    // )
    // return null
   }
  
   async userIsActive(uid: string)
   {
     let snap = await firestore().doc(`AllUsers/${uid}`).get()

     if(snap.exists)
     {
       this.user = snap.data();
       this.user.uid = snap.id
       return snap.exists
     }
     else {
      return false;
     }
   }
  
 

  getAllVehicles()
  {
   // this.auth.user.subscribe(x=> { this.user.uid = x.})
    console.log('a user in service', this.user )
      return this.afirestore.collection(`companies/${this.user.companyID}/vehicles`).snapshotChanges()
  }

  updateVehicle(updated: Vehicle)
  {
    //return this.firestore.doc('Vehicle/' + updated.id).update(updated);
    return this.afirestore.doc(`companies/${this.user.companyID}/vehicles/${updated.id}`).update(updated)
  }

  Refuel(refuel: RefuelRecord)
  {
    console.log(refuel)
    return this.afirestore.collection(`companies/${this.user.companyID}/RefuelRecord`).add(refuel);
  }

  getAllAppointments()
  {
    return this.afirestore.collection(`companies/${this.user.companyID}/appointments`).snapshotChanges()
  }

}
