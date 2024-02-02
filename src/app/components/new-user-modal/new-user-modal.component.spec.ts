import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { NewUserModalComponent } from './new-user-modal.component';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('NewUserModalComponent', () => {
  let component: NewUserModalComponent;
  let fixture: ComponentFixture<NewUserModalComponent>;
  let apiService: ApiService;
  let snackBar: MatSnackBar;
  let dialogRef: MatDialogRef<NewUserModalComponent>;
  // let MatMdcDialogData = MAT_DIALOG_DATA;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewUserModalComponent],
      providers: [
        {
          provide: ApiService,
          useValue: {
            postUser: () => {},
            updateUser: () => {}, // Asegúrate de agregar esta línea
          },
        },
        { provide: MatSnackBar, useValue: { open: () => {}, close: () => {} } },
        {
          provide: MatDialogRef,
          useValue: { open: () => {}, close: () => {} },
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      imports: [MatDialogModule, MatFormFieldModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserModalComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    snackBar = TestBed.inject(MatSnackBar);
    dialogRef = TestBed.inject(MatDialogRef);
  });

  it('should create a new user successfully', () => {
    spyOn(apiService, 'postUser').and.returnValue({
      subscribe: () => ({ unsubscribe: () => {} }),
    } as unknown as Observable<any>);
    spyOn(snackBar, 'open');
    spyOn(dialogRef, 'close');

    component.userForm = {
      valid: true,
      value: {
        /* user data */
      },
    } as any;
    component.isEditing = false;
    component.onCreate();

    expect(apiService.postUser).toHaveBeenCalledWith(component.userForm.value);
    expect(snackBar.open).toHaveBeenCalledWith(
      'User created successfully!',
      'OK',
      { duration: 3000 }
    );
    expect(dialogRef.close).toHaveBeenCalledWith(component.userForm.value);
  });

  it('should update an existing user successfully', () => {
    spyOn(apiService, 'updateUser').and.returnValue({
      subscribe: () => ({ unsubscribe: () => {} }),
    } as unknown as Observable<any>);
    spyOn(snackBar, 'open');
    spyOn(dialogRef, 'close');

    component.userForm = {
      valid: true,
      value: {
        /* user data */
      },
    } as any;
    component.isEditing = true;
    component.data = { userId: '123' };
    component.onCreate();

    expect(apiService.updateUser).toHaveBeenCalledWith(
      component.data.userId,
      component.userForm.value
    );
    expect(snackBar.open).toHaveBeenCalledWith(
      'User updated successfully!',
      'OK',
      { duration: 3000 }
    );
    expect(dialogRef.close).toHaveBeenCalledWith(component.userForm.value);
  });

  it('should display an error message when creating a user fails', () => {
    spyOn(apiService, 'postUser').and.returnValue({
      subscribe: (successCallback: any, errorCallback: any) => ({
        unsubscribe: () => {},
      }),
    } as unknown as Observable<any>);
    spyOn(snackBar, 'open');

    component.userForm = {
      valid: true,
      value: {
        /* user data */
      },
    } as any;
    component.isEditing = false;
    component.onCreate();

    expect(apiService.postUser).toHaveBeenCalledWith(component.userForm.value);
    expect(snackBar.open).toHaveBeenCalledWith(
      'Error creating user. Please try again.',
      'OK',
      { duration: 3000 }
    );
  });

  it('should display an error message when updating a user fails', () => {
    spyOn(apiService, 'updateUser').and.returnValue({
      subscribe: (successCallback: any, errorCallback: any) => ({
        unsubscribe: () => {},
      }),
    } as unknown as Observable<any>);
    spyOn(snackBar, 'open');

    component.userForm = {
      valid: true,
      value: {
        /* user data */
      },
    } as any;
    component.isEditing = true;
    component.data = { userId: '123' };
    component.onCreate();

    expect(apiService.updateUser).toHaveBeenCalledWith(
      component.data.userId,
      component.userForm.value
    );
    expect(snackBar.open).toHaveBeenCalledWith(
      'Error updating user. Please try again.',
      'OK',
      { duration: 3000 }
    );
  });

});

