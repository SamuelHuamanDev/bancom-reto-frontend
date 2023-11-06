import { Component, OnInit } from '@angular/core';
import { UserModel } from '../services/models/user.model';
import { PostsService } from '../services/posts.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PostModel } from '../services/models/post.model';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostDialogComponent } from '../create-post-dialog/create-post-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-list',
	templateUrl: './users-list.component.html',
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*', minHeight: '8rem' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
		])
	],
	styleUrls: [ './users-list.component.scss' ]
})
export class UsersListComponent implements OnInit {
	users: UserModel[] = [];

	displayedColumns: string[] = [ 'name', 'username', 'address', 'email', 'phone' ];
	displayedColumnsWithExpand: string[] = [ ...this.displayedColumns, 'expand' ];
	expandedUser?: UserModel | null;
	expandedUserId = 0;

	isLoadingDetails = true;
	posts: PostModel[] = [];

	constructor(private postsService: PostsService, public dialog: MatDialog, public _snackbar: MatSnackBar) {
	}

	ngOnInit() {
		this.getUsers();
	}

	getUsers() {
		this.postsService.getAllUsers().subscribe({
			next: (users: UserModel[]) => this.users = users,
			error: () =>
					this._snackbar.open('Ups, no se pudieron cargar los usuarios', '', {
						duration: 5000
					})
		});
	}

	expandUser(user: UserModel) {
		this.expandedUser = this.expandedUser === user ? null : user;
		if (this.expandedUser && this.expandedUserId !== this.expandedUser.id) {
			this.getPosts(user.id);
			this.expandedUserId = this.expandedUser.id;
		}
	}

	openCreateDialog(user: UserModel) {
		const dialogRef = this.dialog.open(CreatePostDialogComponent, {
			data: { userId: user.id },
			maxWidth: '90%',
			width: '40rem'
		});
		dialogRef.afterClosed().subscribe(result => this.savePost(result));
	}

	private getPosts(userId: number) {
		this.isLoadingDetails = true;
		this.posts = [];
		this.postsService.getPostsByUserId(userId).subscribe({
			next: (posts: PostModel[]) => this.posts = posts,
			error: () => {
				this.isLoadingDetails = false;
				this._snackbar.open('Ups, no se pudieron cargar los posts', '', {
					duration: 5000
				});
			},
			complete: () => this.isLoadingDetails = false
		});
	}

	private savePost(data: any) {
		this.isLoadingDetails = true;
		this.postsService.saveUsersPost(data).subscribe({
			next: (post: any) => {
				if (post.id) {
					this.getPosts(data.userId);
					this._snackbar.open('Post creado correctamente', '', {
						duration: 3000
					});
				} else {
					this.isLoadingDetails = true;
					this._snackbar.open('No se pudo crear el post', '', {
						duration: 5000
					});
				}
			},
			error: () => {
				console.error();
				this.isLoadingDetails = true;
				this._snackbar.open('No se pudo crear el post', '', {
					duration: 5000
				});
			}
		});
	}
}
