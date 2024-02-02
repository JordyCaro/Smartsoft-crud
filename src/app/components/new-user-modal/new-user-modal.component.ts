// new-user-modal.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../types/user';

@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.css']
})
export class NewUserModalComponent {
  userForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<NewUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [data ? '' : '', data ? [] : [Validators.required]]
    });
    if (data) {
      this.isEditing = true;
      this.userForm.patchValue(data); 
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    console.log('User form:', this.userForm);
    if (this.userForm.valid) {
      const user: User = this.userForm.value;

      if (this.isEditing) {
        // Update existing user
        this.apiService.updateUser(this.data.userId, user).subscribe(
          (response: any) => {
            console.log('User updated successfully:', response);
            this.snackBar.open('User updated successfully!', 'OK', { duration: 3000 });
            this.dialogRef.close(user);
          },
          (error) => {
            console.error('Error updating user:', error);
            this.snackBar.open('Error updating user. Please try again.', 'OK', { duration: 3000 });
          }
        );
      } else {
        // Create new user
        this.apiService.postUser(user).subscribe(
          (response) => {
            console.log('User created successfully:', response);
            this.snackBar.open('User created successfully!', 'OK', { duration: 3000 });
            this.dialogRef.close(user);
          },
          (error) => {
            console.error('Error creating user:', error);
            this.snackBar.open('Error creating user. Please try again.', 'OK', { duration: 3000 });
          }
        );
      }
    }
  }
}
