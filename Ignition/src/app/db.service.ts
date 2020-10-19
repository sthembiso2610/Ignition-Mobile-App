import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore, User } from 'firebase';
import { switchMap } from 'rxjs/operators';
import { Appointment } from 'src/model/appointment.model';
import { Client } from 'src/model/client.model';
import { Company } from 'src/model/company.model';
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
client: Client = {};
appointment: Appointment = {}


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

   createUser( user: IGNUser ) {
	//	const info: AppInfo = this.store.snapshot().app.appInfo;

		const batch: firestore.WriteBatch = firestore().batch();
		// todo: 1. create user
	 	batch.set(firestore().doc(`AllUsers/${user.uid}`), user);
     batch.set(firestore().doc(`companies/${user.companyID}/Employees`), user);

     return batch.commit()
		}
  
   async userIsActive(uid: string)
   {
     let snap = await firestore().doc(`users/${uid}`).get()

     if(snap.exists)
     {
       this.user = snap.data();
       this.user.uid = snap.id
       console.log('a user', this.user)
       return snap.exists
     }
     else {
      return false;
     }
   }

   updateProfile(data: any) {
	//	const user: IGNUser = this.store.snapshot().app.user;
  // return firestore().doc(`users/${user.uid}`).set({ ...data, setup: true }, { merge: true });
   return firestore().doc(`Users/${this.user.uid}`).set({ ...data, setup: true }, { merge: true });

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

  updateAppointment(updated: Appointment)
  {
    //return this.firestore.doc('Vehicle/' + updated.id).update(updated);
    return this.afirestore.doc(`companies/${this.user.companyID}/appointment/${updated.id}`).update(updated)
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
