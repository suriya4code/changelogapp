import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  baseurl = 'https://changelogbackendapi.herokuapp.com/api/v1/change';

  constructor(private httpclient: HttpClient) {}

  getAllChanges(): Observable<any> {
    const xheader = new HttpHeaders({
      'Content-Type': 'application/json; chareset=utf-8',
      Authorization: localStorage.getItem('token'),
      UserMode: localStorage.getItem('um'),
    });

    return this.httpclient.get(this.baseurl, {
      headers: xheader,
    });
  }

  insertnewchange(change: any): Observable<any> {
    const xheader = new HttpHeaders({
      'Content-Type': 'application/json; chareset=utf-8',
      Authorization: localStorage.getItem('token'),
      UserMode: localStorage.getItem('um'),
    });

    return this.httpclient.post(this.baseurl, change, {
      headers: xheader,
    });
  }
  delChange(change: any): Observable<any> {
    const xheader = new HttpHeaders({
      'Content-Type': 'application/json; chareset=utf-8',
      Authorization: localStorage.getItem('token'),
      UserMode: localStorage.getItem('um'),
    });

    return this.httpclient.delete(this.baseurl + '/?id=' + change._id, {
      headers: xheader,
    });
  }
}
