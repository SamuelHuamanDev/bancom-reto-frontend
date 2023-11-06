import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from './models/user.model';
import { environment } from '../../../environments/environment';
import { PostModel } from './models/post.model';

@Injectable({
	providedIn: 'root'
})
export class PostsService {

	constructor(private http: HttpClient) {
	}

	getAllUsers(): Observable<UserModel[]> {
		const url = `${environment.apiBaseUrl}/users`;
		return this.http.get<UserModel[]>(url);
	}

	getPostsByUserId(userId: number): Observable<PostModel[]> {
		const url = `${environment.apiBaseUrl}/users/${userId}/posts`;
		return this.http.get<PostModel[]>(url);
	}

	saveUsersPost(data: any): Observable<any> {
		const url = `${environment.apiBaseUrl}/posts`;
		return this.http.post<any>(url, data)
	}
}
