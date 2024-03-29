import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
	return inject(AuthService).isSessionActive() ? true : inject(Router).createUrlTree([ '/auth/login' ]);
};
