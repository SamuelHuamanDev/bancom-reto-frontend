import { Injectable } from '@angular/core';
import { LocalStorageConstants } from '../../shared/constants/local-storage.constants';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

const CREDENTIALS: any[] = [
	{ username: 'test@mail.com', password: 't3$T' }
];

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private sessionTimeout: any;
	private sessionDurationInMinutes: number = 15;

	constructor(private router: Router, public _snackbar: MatSnackBar) {
	}

	login(username: string, password: string): boolean {
		const isSuccess = !!CREDENTIALS.find(c => c.username === username && c.password === password);
		if (isSuccess)
			this.startSession();
		return isSuccess;
	}

	private startSession(): void {
		this.sessionTimeout = setTimeout(() => this.endSession(), this.sessionDurationInMinutes * 60 * 1000);
		localStorage.setItem(LocalStorageConstants.IS_LOGGED_IN, 'true');
	}

	endSession(): void {
		localStorage.setItem(LocalStorageConstants.IS_LOGGED_IN, 'false');
		this._snackbar.open('Sesión finalizada', '', {
			duration: 5000
		});
		this.router.navigate([ '/' ]);
	}

	isSessionActive(): boolean {
		return !!this.sessionTimeout;
	}
}
