import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firestore, User } from 'firebase';
import { DbService } from '../db.service';
import { switchMap } from 'rxjs/operators';
import { IGNUser } from 'src/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: IGNUser;


  constructor( private afstore: AngularFirestore, 
    public ngFireAuth: AngularFireAuth,
    public router: Router, private db: DbService
   
    ) { 
      
      
    }

    loginUser(email:string, password: string)
    {
     return this.ngFireAuth.signInWithEmailAndPassword(email,password)
    
    }

}
