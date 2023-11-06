import { Injectable } from '@angular/core';
import { LocalStorageConstants } from '../../shared/constants/local-storage.constants';

const CREDENTIALS: any[] = [
	{ username: 'test@mail.com', password: 't3$T' }
];

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private sessionDurationInMinutes: number = 15;

	constructor() {
	}

	login(username: string, password: string): boolean {
		const isSuccess = !!CREDENTIALS.find(c => c.username === username && c.password === password);
		if (isSuccess) {
			localStorage.setItem(LocalStorageConstants.IS_LOGGED_IN, Date.now().toString());
			this.resetSessionTimeout();
		}
		return isSuccess;
	}

	resetSessionTimeout(): void {
		const sessionStartTime = parseInt(localStorage.getItem(LocalStorageConstants.IS_LOGGED_IN) || '0');
		const currentTime = Date.now();
		const elapsedTime = currentTime - sessionStartTime;

		if (elapsedTime < (this.sessionDurationInMinutes * 60 * 1000)) {
			const remainingTime = (this.sessionDurationInMinutes * 60 * 1000) - elapsedTime;
			setTimeout(() => this.endSession(), remainingTime);
		} else {
			this.endSession();
		}
	}

	endSession(): void {
		localStorage.removeItem(LocalStorageConstants.IS_LOGGED_IN);
	}

	isSessionActive(): boolean {
		return !!localStorage.getItem(LocalStorageConstants.IS_LOGGED_IN);
	}
}
