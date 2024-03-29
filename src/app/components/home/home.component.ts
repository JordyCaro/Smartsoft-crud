import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewUserModalComponent } from '../new-user-modal/new-user-modal.component';
import { User } from 'src/app/types/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../comfirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 30];
  totalUsers = 0;
  users: any;
  loader: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = 0) {
    const query = `?page=${page + 1}&per_page=${this.pageSize}`;
    this.loader = true;
    this.apiService.getUsers(query).subscribe(
      (data) => {
        console.log(data);
        this.users = data.data;
        this.totalUsers = data.total;
        this.paginator.length = this.totalUsers;
        this.loader = false;
      },
      (error) => {
        this.loader = false;
      }
    );
  }

  openNewUserModal(user?: User): void {
    const dialogRef = this.dialog.open(NewUserModalComponent, {
      width: '400px', // Ajusta el ancho según tus necesidades
      data: user ? user : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Maneja el nuevo usuario creado
        console.log('Nuevo Usuario:', result);
      }
    });
  }

  deleteUser(userId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Estas seguro que deseas eliminar este usuario?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.deleteUser(userId).subscribe(
          (response) => {
            console.log('User deleted successfully:', response);
            this.snackBar.open('User deleted successfully!', 'OK', {
              duration: 3000,
            });
            this.loadUsers();
          },
          (error) => {
            console.error('Error deleting user:', error);
            this.snackBar.open('Error deleting user. Please try again.', 'OK', {
              duration: 3000,
            });
          }
        );
      }
    });
  }
}
