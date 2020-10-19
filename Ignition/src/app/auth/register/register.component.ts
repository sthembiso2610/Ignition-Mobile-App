import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/db.service';
import { Company } from 'src/model/company.model';
import { IGNUser } from 'src/model/user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

	passwordMinLength: number = 6;
  form: FormGroup;
  clientForm: FormGroup;
  constructor(private fb: FormBuilder, private authservice: AuthService, private db: DbService, public alertcontroller: AlertController, private router: Router ) { }

  ngOnInit() {

    this.form = this.fb.group({
			email: [ '', [ Validators.required, Validators.email ] ],
			// phone: [
			// 	'',
			// 	[
			// 		Validators.required,
			// 		Validators.pattern('^[0-9]*$'),
			// 		Validators.maxLength(10),
			// 		Validators.minLength(10)
			// 	]
			// ],
			name: [ '', [ Validators.required ] ],

			password: [ '', [ Validators.required, Validators.minLength(this.passwordMinLength) ] ],
			companyName: [ '', [ Validators.required, Validators.minLength(3) ] ]
		});

		this.clientForm = this.fb.group({
			
		
			idnum: [
				'',
				[
					Validators.required,
					Validators.pattern('^[0-9]*$'),
					Validators.maxLength(13),
					Validators.minLength(13)
				]
			],
			gender: [ '', [ Validators.required ] ],
			name: [ '', [ Validators.required, ] ],
			code: [ '', [ Validators.required, Validators.maxLength(8), Validators.minLength(8) ] ],
			phone: [
				'',
				[
					Validators.required,
					Validators.pattern('^[0-9]*$'),
					Validators.maxLength(10),
					Validators.minLength(10)
				]
			],
			email: [ '', [ Validators.required, Validators.email ] ],

			password: [ '', [ Validators.required, Validators.minLength(this.passwordMinLength) ] ]
		});

		// this.hasSpecialNeed.valueChanges.subscribe(checked => {
		//   console.log("value changed", checked);

		// });
  }


  back()
  {
    this.router.navigate(['/home'])
  }

  SignUp()
  {
  //  let info: AppInfo = this.store.snapshot().app.appInfo;
  //  let company: Company = this.store.snapshot().app.company;
    const name: string = this.clientForm.controls['name'].value;
   
    let data: { user: IGNUser; password: string } = {
      password: this.clientForm.controls['password'].value,
      user: {
        name: name,
        companyID: null,
        email: this.clientForm.controls['email'].value,
        IDNum: this.clientForm.controls['idnum'].value,
        firstname: name.split(' ')[0],
        lastname: name.split(' ')[1],
        phone: this.clientForm.controls['phone'].value,
  
        isActive: true,

        imageUrl:"https://firebasestorage.googleapis.com/v0/b/fueledup-e59bb.appspot.com/o/app-files%2Fuser_avatar_profile_login_button_account_member-512.png?alt=media&token=732a118a-c6c0-4eaa-bc9f-12873164652d",  //info.avatar,
        setup: false,
        userType: 1,
        empType: '1',
      }
    };
  
    this.authservice.emailExists(this.clientForm.controls['email'].value).then(async (val) => {
      if (!val) {
        this.authservice.idNumExists(this.clientForm.controls['idnum'].value).then(async (val2) => {
              if (!val2) {
                this.authservice
                  .getCompanyFromCode(this.clientForm.controls['code'].value)
                  .then((comp) => {
                    console.log('company ', comp);
                    data.user.companyID = comp.id;
                   this.db.client.companyID = comp.id
                    this.authservice.signUpWithEmail(data);
                  })
                  .catch((e) => {
                  //  this.loading.hide();
                   // this.flash.open(e.message, 'danger');
                  });
              
          } else {
         //   this.loading.hide();

         let alert = await   this.alertcontroller.create({message:'A user with that ID number already exists'});
         alert.present()
          }
        });
      } else {
     //   this.loading.hide();
     let alert = await   this.alertcontroller.create({message:'A user with that email already exists'});
     alert.present()
      }
    });
}
}
