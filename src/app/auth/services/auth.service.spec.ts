import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AuthService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should start and end the session', () => {
		service.login('test@mail.com', 't3$T');
		expect(service.isSessionActive()).toBe(true);

		service.endSession();
		expect(service.isSessionActive()).toBe(false);
	});
});
