import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  baseurl = 'http://localhost:3000/api/v1/change';

  constructor(private httpclient: HttpClient) {}

  getAllChanges(): Observable<any> {
    const xheader = new HttpHeaders({
      'Content-Type': 'application/json; chareset=utf-8',
    });
    return this.httpclient.get(this.baseurl, {
      headers: xheader,
      params: new HttpParams().append('token', localStorage.getItem('token')),
    });
  }
  insertnewchange(change: any): Observable<any> {
    const xheader = new HttpHeaders({
      'Content-Type': 'application/json; chareset=utf-8',
    });
    return this.httpclient.post(this.baseurl, change, {
      headers: xheader,
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  delChange(change: any): Observable<any> {
    const xheader = new HttpHeaders({
      'Content-Type': 'application/json; chareset=utf-8',
    });
    return this.httpclient.delete(this.baseurl + '/?id=' + change._id, {
      params: new HttpParams().append('token', localStorage.getItem('token')),
      headers: xheader
    });
  }
}
