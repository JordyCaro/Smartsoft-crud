import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  pageSize = 10;
  pageSizeOptions: number[] = [10,20,30];
  totalUsers = 0;
  users: any;
  loader: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = 0) {
    const query = `?page=${page + 1}&per_page=${this.pageSize}`; 
    this.apiService.getUsers(query).subscribe(
      (data) => {
        console.log(data);
        this.users = data.data;
        this.totalUsers = data.total;
        this.paginator.length = this.totalUsers;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  }




