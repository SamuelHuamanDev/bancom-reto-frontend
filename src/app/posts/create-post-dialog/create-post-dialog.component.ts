import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-create',
	templateUrl: './create-post-dialog.component.html',
	styleUrls: [ './create-post-dialog.component.scss' ]
})
export class CreatePostDialogComponent {
	form: FormGroup;

	constructor(private fb: FormBuilder,
	            public dialogRef: MatDialogRef<CreatePostDialogComponent>,
	            @Inject(MAT_DIALOG_DATA) public data: any) {
		this.form = this.fb.group({
			'title': new FormControl('', Validators.required),
			'description': new FormControl('', Validators.required)
		});
	}

	onSubmit() {
		if (this.form.valid)
			this.dialogRef.close({
				userId: this.data.userId,
				title: this.title.value,
				body: this.description.value
			});
	}

	get title() {
		return this.form.controls['title'];
	}

	get description() {
		return this.form.controls['description'];
	}

}
