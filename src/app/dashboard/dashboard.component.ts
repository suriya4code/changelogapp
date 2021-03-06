import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { isNullOrUndefined } from 'util';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private _router: Router,
    public authService:AuthService
  ) {}
  allchanges;
  newformerr = false;
  submitted = false;
  currentuser;
  @ViewChild('closebutton') closebutton;

  ngOnInit() {
    this.getAllChangesData();
    this.currentuser = localStorage.getItem('currentusername');
  }

  newchngForm = this.fb.group({
    Title: ['', Validators.required],
    Type: ['', Validators.required],
    Content: ['', Validators.required],
  });

  get f() {
    return this.newchngForm.controls;
  }
  getTypeclass(type: string) {
    switch (type) {
      case 'New Release':
        return 'badge badge-pill badge-primary';
      case 'Fix':
        return 'badge badge-pill badge-danger';
      case 'Update':
        return 'badge badge-pill badge-success';
      default:
        break;
    }
  }
  getAllChangesData() {
    this.dashboardService.getAllChanges().subscribe(
      (resp) => {
        this.allchanges = resp;
      },
      (err) => {
        console.log('Error Occured :' + JSON.stringify(err, undefined, 2));
          this._router.navigate(['login']);
      }
    );
  }
  insertChange() {
    this.submitted = true;
    var nwchange = this.newchngForm.value;
    if (!this.newchngForm.valid) {
      //return (this.newformerr = true);
    } else {
      this.newformerr = false;
      this.dashboardService.insertnewchange(nwchange).subscribe(
        (resp) => {
          console.log(resp);
          this.submitted = false;
        },
        (err) => {
          console.log('Error Occured :' + JSON.stringify(err, undefined, 2));
        }
      );
    
      this.closebutton.nativeElement.click();
      this.nextstep();
    }
  }

  nextstep() {
    this.newchngForm.reset();
    this.newformerr = false;
    this._router.navigate(['dashboard']);
    this.ngOnInit();

  }
  deleteRow(change: any) {
    if (!isNullOrUndefined(change)) {
      this.dashboardService.delChange(change).subscribe(
        (resp) => {},
        (err) => {
          console.log('Error Occured :' + JSON.stringify(err, undefined, 2));
        }
      );
      this.nextstep();
    }
  }
  logoff() {
    localStorage.removeItem('token');
    localStorage.removeItem('um');
    localStorage.removeItem('currentusername');
    this.authService.signOut();
    this._router.navigate(['login']);
  }
}
