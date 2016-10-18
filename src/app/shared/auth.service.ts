import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject, ReplaySubject } from "rxjs/Rx";
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { User } from "./user.interface";
import {FirebaseService} from '../services/firebase.service';
declare var firebase: any;

@Injectable()
export class AuthService {
    user: User;
    error: any;

    public activeLogin:ReplaySubject<any> = new ReplaySubject(1);

    constructor(public af: AngularFire, private router: Router, private firebaseService: FirebaseService) {
    this.af.auth.subscribe(auth => console.log(auth));
    // this.router.navigate(['home'])
    
  }

    signupUser(user: User) {
        

        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .catch(function (error) {
                console.log(error);
            });
    }

    signinUser(user: User) {
       
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .catch((error) => {
  this.handleError(error);
});
    }
    
    handleError(error: any) {
        // log out the user if we get a 401 message
        return this.activeLogin.next(error)
    }

    logout() {

        firebase.auth().signOut();
        // this.router.navigate(['/signup']);
    }

    isAuthenticated(): Observable<boolean> {
        const state = new Subject<boolean>();
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                state.next(true);
            } else {
                state.next(false);
            }
        });
        return state.asObservable();
    }

    loginFace(){
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  this.user.name = user.displayName;
  this.user.email = user.email;
  this.user.profilePhoto = user.photoUrl;
 
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

    }

    loginTwitter(){
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
  // You can use these server side with your app's credentials to access the Twitter API.
  var token = result.credential.accessToken;
  var secret = result.credential.secret;
  // The signed-in user info.
  var user = result.user;
  this.user.name = user.displayName;
  this.user.email = user.email;
  this.user.profilePhoto = user.photoUrl;
 
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
    }

    loginGoogle(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  this.user.name = user.displayName;
  this.user.email = user.email;
  this.user.profilePhoto = user.photoUrl;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
    }


}
