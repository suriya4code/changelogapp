import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted;
  loading;
  constructor(
    private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.loginservice.login(this.loginForm.value).subscribe(
        (data) => {
          console.log(data);
          localStorage.setItem('token', data.toString());
          this._router.navigate(['/dashboard']);
        },
        (error) => {}
      );
    }
  }
}
