import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { FirebaseService } from './../../services/firebase.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent {
    myForm: FormGroup;
    error = false;
    errorMessage = '';


    constructor(private authService: AuthService, private fb: FormBuilder, private firebaseService: FirebaseService) {

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



    onSignup() {
        this.authService.signupUser(this.myForm.value);
    }

    ngOnInit(): any {
        this.myForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([
                Validators.required,
                this.isEmail
            ])],
            password: ['', Validators.required],
            // confirmPassword: ['', Validators.compose([
            //     Validators.required,
            //     this.isEqualPassword.bind(this)
            // ])],
        });
    }

    isEmail(control: FormControl): { [s: string]: boolean } {
        if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            return { noEmail: true };
        }
    }

    isEqualPassword(control: FormControl): { [s: string]: boolean } {
        if (!this.myForm) {
            return { passwordsNotMatch: true };

        }
        if (control.value !== this.myForm.controls['password'].value) {
            return { passwordsNotMatch: true };
        }
    }

}
