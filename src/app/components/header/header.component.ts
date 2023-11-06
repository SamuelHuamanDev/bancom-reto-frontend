import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent {
	@Output() menuClick = new EventEmitter<void>();

	isScrolled = false;

	constructor(public authService: AuthService) {
	}

	onMenuClick() {
		this.menuClick.emit();
	}

	@HostListener('window:scroll', [])
	onViewScroll() {
		const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
		this.isScrolled = scrollPosition > 64;
	}
}
