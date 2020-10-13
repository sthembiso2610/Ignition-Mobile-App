import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(public firestore: AngularFirestore, public auth: AuthService) { }




  getAllVehicles()
  {

    return this.firestore.collection(`companies/${this.auth.userData.uid}/vehicles`).snapshotChanges()
  }
}
