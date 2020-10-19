import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firestore, User } from 'firebase';
import { DbService } from '../db.service';
import { switchMap } from 'rxjs/operators';
import { IGNUser } from 'src/model/user.model';
import { Company } from 'src/model/company.model';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: IGNUser;


  constructor( private afstore: AngularFirestore, 
    public ngFireAuth: AngularFireAuth,
    public router: Router, private db: DbService, private alertcontroller: AlertController
   
    ) { 
      
      
    }

    loginUser(email:string, password: string)
    {
     return this.ngFireAuth.signInWithEmailAndPassword(email,password)
    
    }

    async emailExists(email: string): Promise<boolean> {
      const snap: QuerySnapshot<DocumentData> = await firestore()
        .collection('AllUsers')
        .where('email', '==', email)
        .get();
      return snap.docs.length > 0;
    }

    async idNumExists(idNum: string): Promise<boolean> {
      const snap: QuerySnapshot<DocumentData> = await firestore()
        .collection('users')
        .where('idNum', '==', idNum)
        .get();
      return snap.docs.length > 0;
    }

    getCompanyFromCode(code: string): Promise<Company | null> {
      return new Promise(async (resolve, reject) => {
        let snap: QuerySnapshot<DocumentData>;
        try {
          snap = await firestore().collection('companies').where('code', '==', code).get();
        } catch (error) {
          reject(error);
        }
        let comp: Company;
        if (snap.docs.length > 0) {
          comp = { ...snap.docs[0].data(), id: snap.docs[0].id };
        } else {
          comp = null;
        }
        resolve(comp);
      });
    }

    signUpWithEmail(data: { password: string; user: IGNUser }) {

      this.ngFireAuth.createUserWithEmailAndPassword(data.user.email, data.password).then(async (cred) => {
        data.user.uid = cred.user.uid;
        this.db
          .createUser(data.user)
          .then(async () => {
  
            let doc = await this.afstore.doc(`companies/${data.user.companyID}/Clients/${this.db.client.uid}`).get().toPromise();
            this.db.client = data.user;
  
          //  this.store.dispatch(new SetUser(doc.data()));
          //  this.loading.hide();
            this.router.navigate([ '/login' ]);
          })
          .catch((error) => {
        //    this.loading.hide();
           let v =  this.alertcontroller.create(error.message);
              
          });
      });
    }

}
