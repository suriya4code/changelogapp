import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { isNullOrUndefined } from 'util';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private fb: FormBuilder
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
        console.log(resp);
      },
      (err) => {
        console.log('Error Occured :' + JSON.stringify(err, undefined, 2));
      }
    );
  }
  insertChange() {
    var nwchange = this.newchngForm.value;
    console.log(nwchange);
    if (this.newchngForm.dirty && !this.newchngForm.valid) {
      return (this.newformerr = true);
    }
    else {
      this.dashboardService.insertnewchange(nwchange).subscribe(
        (resp) => {
          console.log(resp);
        },
        (err) => {
          console.log('Error Occured :' + JSON.stringify(err, undefined, 2));
        }
      );
    }
  }
  deleteRow(change: any) {
    if (!isNullOrUndefined(change)) {
      this.dashboardService.delChange(change).subscribe(
        (resp) => {
          this.allchanges = resp;
          console.log(resp);
        },
        (err) => {
          console.log('Error Occured :' + JSON.stringify(err, undefined, 2));
        }
      );
    }
  }
}
