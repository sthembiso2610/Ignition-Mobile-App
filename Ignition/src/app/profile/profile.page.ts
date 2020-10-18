import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmergencyContact } from 'src/model/emergencyContact.model';
import { IGNUser } from 'src/model/user.model';
import { DbService } from '../db.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  empForm: FormGroup;
	unsubscribe: Subscription[] = [];
	contactForm: FormGroup;
	passwordMinLength: number = 8;
	uid?: string;
	userType?: number;
  init: boolean = false;
  genderOptions: string[] = ['Male', 'Female']
  relations: string[] = ['Mother', 'Father', 'Friend', 'Guardian']


  constructor(	private router: Router,
	//	private dialog: DialogService,
	
		private route: ActivatedRoute,
	//	private flash: FlashService,
		
		private fb: FormBuilder,
		private db: DbService,
	) { }

  ngOnInit() {

    this.empForm = this.fb.group({
			empType: [ '', [ Validators.required ] ],
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
			name: [ '', [ Validators.required,  ] ],
			phone: [
				'',
				[
					Validators.required,
					Validators.pattern('^[0-9]*$'),
					Validators.maxLength(10),
					Validators.minLength(10)
				]
			],
			email: [ '', [ Validators.required, Validators.email ] ]
		});

		this.contactForm = this.fb.group({
			relation: [ '', [ Validators.required ] ],
			name: [ '', [ Validators.required,  ] ],
			phone: [
				'',
				[
					Validators.required,
					Validators.pattern('^[0-9]*$'),
					Validators.maxLength(10),
					Validators.minLength(10)
				]
			],
			email: [ '', [ Validators.email ] ]
		});

		// const sub = this.route.paramMap.subscribe((params) => {
		// 	if (params.get('id')) {
		// 		this.uid = params.get('id');
		// 		const sub = this.store
		// 			.select(AppState.employee)
		// 			.pipe(map((filterFn) => filterFn(this.uid)))
		// 			.subscribe((val) => {

	// 					if (val.name != '' && !this.init) {
	// 						this.init = true;
	// 						this.userType = val.userType;
	// 						this.empForm.controls['name'].setValue(val.name);
	// 						this.empForm.controls['idnum'].setValue(val.IDNum);
	// 						this.empForm.controls['empType'].setValue(val.empType);
	// 						this.empForm.controls['phone'].setValue(val.phone);
	// 						this.empForm.controls['gender'].setValue(val.gender);
	// 						this.empForm.controls['email'].setValue(val.email);

	// 						// contact form
	// 						this.contactForm.controls['name'].setValue(val.contact.name);
	// 						this.contactForm.controls['phone'].setValue(val.contact.phone);
	// 						this.contactForm.controls['email'].setValue(val.contact.email);
	// 						this.contactForm.controls['relation'].setValue(val.contact.relation);

	// 						Object.keys(this.empForm.controls).forEach((e) => this.empForm.controls[e].disable());
	// 						Object.keys(this.contactForm.controls).forEach((e) =>
	// 							this.contactForm.controls[e].disable()
	// 						);
	// 					}
	// 				});
	// 			this.unsubscribe.push(sub);
	// 		} else {
	// 			console.log('no id');
	// 		}
	// 	});
	// 	this.unsubscribe.push(sub);
  }

  
  
	validateempForm() {
		const controls = this.empForm.controls;
		if (this.empForm.invalid) {
			Object.keys(controls).forEach((e) => controls[e].markAsTouched());

			return false;
		}

		return true;
	}

	contactControlHasError(controlName: string, validation: string): boolean {
		let control = this.contactForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(validation) && (control.dirty || control.touched);
	}

	validatecontactForm() {
		const controls = this.contactForm.controls;
		if (this.contactForm.invalid) {
			Object.keys(controls).forEach((e) => controls[e].markAsTouched());

			return false;
		}

		return true;
  }
  
  empControlHasError(controlName: string, validation: string): boolean {
		let control = this.empForm.controls[controlName];
		if (!control) {
			return false;
    }
  }

  submit()
  {


    if (this.validateempForm() && this.validatecontactForm()) {
			// let info: AppInfo = this.store.snapshot().app.appInfo;
			// let company: Company = this.store.snapshot().app.company;
			const contactName: string = this.contactForm.controls['name'].value;
			const name: string = this.empForm.controls['name'].value;

			const contact: EmergencyContact = {
				name: contactName,
				firstname: contactName.split(' ')[0],
				lastname: contactName.split(' ')[1],
				relation: this.contactForm.controls['relation'].value,
				phone: this.contactForm.controls['phone'].value,
				email: this.contactForm.controls['email'].value
			};

			const user: IGNUser = {
				email: this.empForm.controls['email'].value,
				name: name,
			//	companyID: company.id,
				contact: contact,
				firstname: name.split(' ')[0],
				lastname: name.split(' ')[1],
			//	imageUrl: info.avatar,
				phone: this.empForm.controls['phone'].value,
				IDNum: this.empForm.controls['idnum'].value,
				gender: Number(this.empForm.controls['gender'].value),
				userType: 1,
			//	workingHours: company.workingHours,
				isActive: true,
				empType: this.empForm.controls['empType'].value
			};
			console.log('user', user);
		// //	this.loading.show();
		// 	this.db
		// 		.emailExists(user.email)
		// 		.then((val) => {
		// 			if (!val) {
		// 				this.auth
		// 					.signUpEmp({
		// 						user: user
		// 					})
		// 					.then(() => {
		// 						this.loading.hide();
		// 						this.dialog
		// 							.success(
		// 								`Registration complete! An email has been sent to ${user.firstname} with login details`
		// 							)
		// 							.then(() => {
		// 								this.router.navigate([ '/dashboard/staff' ]);
		// 							});
		// 					})
		// 					.catch((e) => {
		// 						this.loading.hide();
		// 						this.flash.open(e.message, 'danger');
		// 					});
					} else {
						// this.loading.hide();
						// this.flash.open('A user with that email already exists', 'danger');
					}
				// })
				// .catch((e) => {
				// 	console.log('error 1');
				// 	this.loading.hide();
				// 	this.flash.open(e.message, 'danger');
				// });
		}
	}
 // }


//}
