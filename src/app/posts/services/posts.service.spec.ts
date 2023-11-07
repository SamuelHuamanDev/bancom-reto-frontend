import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserModel } from './models/user.model';
import { environment } from '../../../environments/environment';
import { PostModel } from './models/post.model';

describe('PostsService', () => {
	let postService: PostsService;
	let httpTestingController: HttpTestingController;

	const mockUsers: UserModel[] = [
		{
			'id': 1,
			'name': 'Leanne Graham',
			'username': 'Bret',
			'email': 'Sincere@april.biz',
			'address': {
				'street': 'Kulas Light',
				'suite': 'Apt. 556',
				'city': 'Gwenborough',
				'zipcode': '92998-3874',
				'geo': {
					'lat': '-37.3159',
					'lng': '81.1496'
				}
			},
			'phone': '1-770-736-8031 x56442',
			'website': 'hildegard.org',
			'company': {
				'name': 'Romaguera-Crona',
				'catchPhrase': 'Multi-layered client-server neural-net',
				'bs': 'harness real-time e-markets'
			}
		}
	];

	const mockPosts: PostModel[] = [
		{
			'userId': 1,
			'id': 1,
			'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
			'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
		}
	];

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			providers: [ PostsService ]
		});

		postService = TestBed.inject(PostsService);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should be created', () => {
		expect(postService).toBeTruthy();
	});

	it('should get all users', () => {
		postService.getAllUsers().subscribe(users => {
			expect(users).toEqual(mockUsers);
		});

		const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/users`);
		expect(req.request.method).toBe('GET');
		req.flush(mockUsers);
	});

	it('should get posts by user ID', () => {
		const userId: number = 1;

		postService.getPostsByUserId(userId).subscribe(posts => {
			expect(posts).toEqual(mockPosts);
		});

		const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/users/${userId}/posts`);
		expect(req.request.method).toBe('GET');
		req.flush(mockPosts);
	});

	it('should save user\'s post', () => {
		const mockPostData: any = {
			'title': 'foo',
			'body': 'bar',
			'userId': 1
		};

		postService.saveUsersPost(mockPostData).subscribe(response => {
			expect(response.id).toBeGreaterThan(0);
		});

		const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/posts`);
		expect(req.request.method).toBe('POST');
		req.flush({
			'title': 'foo',
			'body': 'bar',
			'userId': 1,
			'id': 101
		});
	});
});
