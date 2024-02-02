import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


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

  public postUser(data: any): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}register/`,
      data,
    );
  }

}
