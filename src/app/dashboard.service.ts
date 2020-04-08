import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.httpclient.get(this.baseurl, { headers: xheader });
  }
  insertnewchange(change:any): Observable<any> {
    const xheader = new HttpHeaders({
      'Content-Type': 'application/json; chareset=utf-8',
    });
    return this.httpclient.post(this.baseurl, change, { headers: xheader });
  }
  delChange(change: any): Observable<any> {
    const xheader = new HttpHeaders({
      'Content-Type': 'application/json; chareset=utf-8',
    });
    return this.httpclient.delete(this.baseurl + '/?id=' + change._id, {
      headers: xheader,
    });
  }
}
