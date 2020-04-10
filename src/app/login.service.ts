import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _http: HttpClient) {}

  baseurl = 'http://localhost:3333/api/v1/users';

  submitRegister(body: any) {
    return this._http.post(this.baseurl + '/register', body, {
      observe: 'body',
    });
  }

  login(body: any) {
    return this._http.post(this.baseurl + '/login', body, {
      observe: 'body',
    });
  }

  getUserName() {
    return this._http.get(this.baseurl + '/username', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token')),
    });
  }
}
