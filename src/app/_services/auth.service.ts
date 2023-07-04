import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_UAUTH_URL } from '../constants/url.constants';

// const AUTH_API = 'http://localhost:7070/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(API_UAUTH_URL + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string,uRole:string): Observable<any> {
    return this.http.post(API_UAUTH_URL + 'signup', {
      username,
      email,
      password,
      uRole
    }, httpOptions);
  }

  updateUser(username: string, email: string, password: string,uRole:string,id): Observable<any> {
    return this.http.put(API_UAUTH_URL + 'update', {
      id,
      username,
      email,
      password,
      uRole
    }, httpOptions);
  }

  deleteUser(payload:any): Observable<any> {
       
    let id = payload.id;
    return this.http.delete(API_UAUTH_URL+'user/delete/' +id,{ responseType: 'text' })
    .pipe(
      map((response) => {
            return response;
        })
    );
}


}
