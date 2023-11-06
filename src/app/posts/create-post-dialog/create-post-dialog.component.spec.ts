import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostDialogComponent } from './create-post-dialog.component';

describe('CreateComponent', () => {
  let component: CreatePostDialogComponent;
  let fixture: ComponentFixture<CreatePostDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePostDialogComponent]
    });
    fixture = TestBed.createComponent(CreatePostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
