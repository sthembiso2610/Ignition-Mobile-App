import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: User;


  constructor( private afstore: AngularFirestore, 
    public ngFireAuth: AngularFireAuth,
    public router: Router  ) { 
     
    }

    loginUser(email:string, password: string)
    {
     return this.ngFireAuth.signInWithEmailAndPassword(email,password)
     .then((c)=>
     {
     return this.afstore.doc(`AllUsers/${c.user.uid}`).get()
       console.log( c.user.uid)
     })
    }

}
