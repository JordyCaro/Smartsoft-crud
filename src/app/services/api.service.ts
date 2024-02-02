import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../types/user';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x: string]: any;

  public apiUrl = environment.API_URL;
  constructor(private httpClient: HttpClient) {}

  public getUsers(query: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}users/${query}`);
  }

  public postUser(data: User): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}register/`,
      data,
    );
  }

  public updateUser(id: number, data: User): Observable<any> {
    return this.httpClient.put(
      `${this.apiUrl}users/${id}`,
      data,
    );
  }

  public deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}users/${id}`);
  }

}
