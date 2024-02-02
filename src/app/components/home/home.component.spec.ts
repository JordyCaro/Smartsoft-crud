import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUsers']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent, HeaderComponent, FooterComponent],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
      imports: [HttpClientModule, MatSnackBarModule, MatPaginatorModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    const matPaginator =
      TestBed.createComponent(MatPaginator).componentInstance;
    component.paginator = matPaginator;
  });

  it('should load users and update component properties', () => {
    const page = 0;
    const query = `?page=${page + 1}&per_page=${component.pageSize}`;
    const usersData = {
      data: ['user1', 'user2'],
      total: 2,
    };

    apiServiceSpy.getUsers.and.returnValue(of(usersData));

    component.loadUsers(page);

    expect(apiServiceSpy.getUsers).toHaveBeenCalledWith(query);
    expect(component.users).toEqual(usersData.data);
    expect(component.totalUsers).toEqual(usersData.total);
    expect(component.paginator.length).toEqual(usersData.total);
    expect(component.loader).toBeFalse();
  });

  it('should handle error when loading users', () => {
    const page = 0;
    const query = `?page=${page + 1}&per_page=${component.pageSize}`;
    const error = 'Error loading users';

    apiServiceSpy.getUsers.and.returnValue(throwError(error));

    component.loadUsers(page);

    expect(apiServiceSpy.getUsers).toHaveBeenCalledWith(query);
    expect(component.loader).toBeFalse();
  });
});
