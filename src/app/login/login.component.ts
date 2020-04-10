import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from 'angularx-social-login';

import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted;
  loading;
  loginerr = false;
  constructor(
    private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private _router: Router,
    private authService: AuthService
  ) {}
  private user: SocialUser;
  private loggedIn: boolean;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public socialSignIn(socialProvider: string) {
    let socialPlatformProvider;
    if (socialProvider === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.authService
      .signIn(socialPlatformProvider)
      .then((socialusers) => {
        console.log(socialProvider, socialusers);
        console.log(socialusers);
        localStorage.setItem('currentusername', socialusers.name);
        localStorage.setItem('token', socialusers.authToken);
          localStorage.setItem('um', 'social');
        this._router.navigate(['/dashboard']);
        this.Savesresponse(socialusers);
      })
      .catch((err) => {});
  }
  Savesresponse(socialusers: SocialUser) {
    console.log(socialusers);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loginerr = false;
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.loginservice.login(this.loginForm.value).subscribe(
        (data) => {
          console.log(data);
          localStorage.setItem('token', data.toString());
          localStorage.setItem('um', 'local');
          localStorage.setItem(
            'currentusername',
            this.loginForm.value.username
          );
          this._router.navigate(['/dashboard']);
        },
        (error) => {
          this.loginerr = true;
        }
      );
    }
  }
}
