import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router, RouterModule } from '@angular/router';

import { Observable, Subject } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FirebaseService } from './../../services/firebase.service';
import { AuthService } from './../../shared/auth.service';


declare var firebase: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

	myForm: FormGroup;
    error: any;
    errorMessage = '';
    loginVerify: string;
    SignIn = true;

constructor(public af: AngularFire, private router: Router, private authService: AuthService, private fb: FormBuilder,
private firebaseService: FirebaseService) {
    this.af.auth.subscribe(auth => console.log(auth),
     );

    this.authService.activeLogin.subscribe(active => this.error = active);
  }

  signUp() {
    this.SignIn = false;
  }

  invalidUser() {

			let data = this.error;
			if (data != undefined) {
				this.authService.activeLogin.unsubscribe();
				return true;
			}



  }

  loginFace() {
    this.firebaseService.login('facebook');
  }

  loginGoogle() {
    this.firebaseService.login('google');
  }

  loginTwitter() {
    this.firebaseService.login('twitter');
  }

  login() {

    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }
  overrideLogin() {
    this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous,
    });
  }

  logout() {
        firebase.auth().signOut();
        this.router.navigate(['/signup']);
    }

    onSignin() {
      this.error = this.authService.signinUser(this.myForm.value);
    }



    ngOnInit(): any {
        this.myForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
}
