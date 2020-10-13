import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-loging',
  templateUrl: './loging.page.html',
  styleUrls: ['./loging.page.scss'],
})
export class LogingPage implements OnInit {
  form: FormGroup;
  passwordMinLength = 6;
  constructor(private service: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.form = this.fb.group({
			email: [ '', [ Validators.required, Validators.email ] ],
			password: [ '', [ Validators.required, Validators.minLength(this.passwordMinLength) ] ]
		});

  }

  controlHasError(controlName: string, validation: string): boolean {
		let control = this.form.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(validation) && (control.dirty || control.touched);
  }
  
  validateForm() {
		const controls = this.form.controls;
		if (this.form.invalid) {
			Object.keys(controls).forEach((e) => controls[e].markAsTouched());

			return false;
    }
    return true;
	}


  loginUser()
  {
    let email = this.form.controls['email'].value;
    let  password =   this.form.controls['password'].value
    this.service.loginUser(email,password).then(x=>
      {
        
        console.log('loginuser', x);
          this.router.navigate(['/vehicles'])
      })
  }

}
