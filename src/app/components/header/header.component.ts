import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent {
	@Output() menuClick = new EventEmitter<void>();

	isScrolled = false;

	onMenuClick() {
		this.menuClick.emit();
	}

	@HostListener('window:scroll', [])
	onViewScroll() {
		const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
		this.isScrolled = scrollPosition > 64;
	}
}
