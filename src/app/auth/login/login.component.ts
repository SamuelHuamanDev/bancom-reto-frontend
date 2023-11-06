import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ]
})
export class LoginComponent {
	hidePassword = true;
	form: FormGroup;

	constructor(private fb: FormBuilder,
	            private authService: AuthService,
	            private router: Router,
	            public _snackbar: MatSnackBar) {
		this.form = this.fb.group({
			'username': new FormControl('', Validators.compose([
				Validators.required,
				Validators.email
			])),
			'password': new FormControl('', Validators.required)
		});
	}

	doLogin() {
		if (this.form.valid) {
			const isLoggedIn = this.authService.login(this.username.value, this.password.value);
			if (isLoggedIn)
				this.router.navigate([ '/' ]);
			else
				this._snackbar.open('Credenciales incorrectas', '', {
					duration: 5000
				});
		}
	}

	get username() {
		return this.form.controls['username'];
	}

	get password() {
		return this.form.controls['password'];
	}
}
