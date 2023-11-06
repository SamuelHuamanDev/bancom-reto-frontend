import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    LoginComponent
  ],
	imports: [
		CommonModule,
		AuthRoutingModule,
		NgOptimizedImage,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatCheckboxModule
	]
})
export class AuthModule { }
