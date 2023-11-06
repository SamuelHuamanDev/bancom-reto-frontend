import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		HomeRoutingModule,
		NgOptimizedImage,
		MatButtonModule,
		MatIconModule
	]
})
export class HomeModule {
}
