import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { EmergencyContact } from 'src/model/emergencyContact.model';
import { IGNUser } from 'src/model/user.model';
import { DbService } from '../db.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

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
	// Progress monitoring
	percentage: Observable<number>;
	filename: string;
	fileref: string;
	task: AngularFireUploadTask;
	snapshot: Observable<any>;

//	@Select(AppState.user) user$: Observable<IGNUser>;


  constructor(	private router: Router,
	//	private dialog: DialogService,
	
		private route: ActivatedRoute,
	//	private flash: FlashService,
		private alertController: AlertController,
		private fb: FormBuilder,
		private db: DbService,
		private storage: AngularFireStorage,
	
	) { }

  ngOnInit() {

    this.empForm = this.fb.group({

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


  async startUpload(event: FileList) {
  //  const user: IGNUser = this.store.snapshot().app.user;
   
       let loggedIn  = this.db.user
    

		// The File object
		const file = event.item(0);
		if (!file.type.includes('image')) {
		let alert = this.alertController.create({message:'Please make sure your file is an image'});
			return;
		}

		// The storage path
		const path = `files/${loggedIn.uid}/${new Date().getTime()}_${file.name}`;
		this.filename = file.name;
		this.fileref = path;
    const fileRef = this.storage.ref(path);
    console.log('this is the file ref', this.fileref)
		// Totally optional metadata
		const customMetadata = { app: 'Angular PWA' };

		// The main task
		this.task = this.storage.upload(path, file, { customMetadata });

		// Progress monitoring
		this.percentage = this.task.percentageChanges();
		this.snapshot = this.task.snapshotChanges();

		// The file's download URL
		this.task
			.snapshotChanges()
			.pipe(
				finalize(() => {
					fileRef.getDownloadURL().subscribe((url) => {
			console.log('this is the url', url)
							this.db.user.imageUrl = url
						this.updateProfile({
							imageUrl: url
            });
					});
				})
			)
			.subscribe();
	}

	ngOnDestroy(): void {
		this.unsubscribe.forEach((e) => {
			if (!e.closed) {
				e.unsubscribe();
			}
		});
	}

	updateProfile(update) {
		//this.loading.show();
		this.db
			.updateProfile(update)
			.then(async () => {
			//	this.loading.hide();
			let alert = await	this.alertController.create({message:'profile updated'});
				alert.present()
			})
			.catch(async (e) => {
				//this.loading.hide();
				let alert = await	this.alertController.create({message:e.message});
				alert.present()
			});
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
