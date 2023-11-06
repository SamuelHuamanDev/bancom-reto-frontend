import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreatePostDialogComponent } from './create-post-dialog/create-post-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		UsersListComponent,
  CreatePostDialogComponent
	],
	imports: [
		CommonModule,
		PostsRoutingModule,
		MatTableModule,
		MatButtonModule,
		MatIconModule,
		MatProgressSpinnerModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule
	]
})
export class PostsModule {
}
