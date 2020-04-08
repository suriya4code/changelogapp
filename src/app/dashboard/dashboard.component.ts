import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { isNullOrUndefined } from 'util';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private _router: Router
  ) {}
  allchanges;
  newformerr = false;
  ngOnInit() {
    this.getAllChangesData();
  }

  newchngForm = this.fb.group({
    Title: ['', Validators.required],
    Type: ['', Validators.required],
    Content: ['', Validators.required],
  });
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
        if (err.status == 401) {
          this._router.navigate(['login']);
        }
      }
    );
  }
  insertChange() {
    var nwchange = this.newchngForm.value;
    if (
      (this.newchngForm.dirty && !this.newchngForm.valid) ||
      this.newchngForm.value.Title == null
    ) {
      return (this.newformerr = true);
    } else {
      this.newformerr = false;
      this.dashboardService.insertnewchange(nwchange).subscribe(
        (resp) => {
          console.log(resp);
        },
        (err) => {
          console.log('Error Occured :' + JSON.stringify(err, undefined, 2));
        }
      );
      this.nextstep();
    }
  }

  nextstep() {
    this.newchngForm.reset();
    this.newformerr = false;
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
    this._router.navigate(['login']);
  }
}
