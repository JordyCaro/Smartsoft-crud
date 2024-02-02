// new-user-modal.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.css']
})
export class NewUserModalComponent {
  userForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<NewUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;

      this.apiService.postUser(newUser).subscribe(
        (response) => {
          console.log('User created successfully:', response);
          this.snackBar.open('User created successfully!', 'OK', { duration: 3000 });
          this.dialogRef.close(newUser);
        },
        (error) => {
          console.error('Error creating user:', error);
          this.snackBar.open('Error creating user. Please try again.', 'OK', { duration: 3000 });
        }
      );
    }
  }
}
