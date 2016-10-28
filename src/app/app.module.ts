import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';

import { MaterialModule } from '@angular/material';


import {routing } from './app.routing';
import { AuthGuard } from './shared/auth.guard';
import { AuthService } from './shared/auth.service';

import {FirebaseService} from './services/firebase.service';


import * as firebase from 'firebase';

import { LoginModule } from './login/login.module';
import { LayoutModule } from './layout/layout.module';
import { LOCALE_ID } from '@angular/core';


export const firebaseConfig = {
  apiKey: 'AIzaSyB_SQySY7aFvUz5hpUbjznFkYB0w8TTpRY',
  authDomain: 'angularufpb.firebaseapp.com',
  databaseURL: 'https://angularufpb.firebaseio.com',
  storageBucket: 'angularufpb.appspot.com'
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    routing,
    LoginModule,
    LayoutModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    FirebaseService,
    { provide: LOCALE_ID, useValue: "pt-BR" }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
