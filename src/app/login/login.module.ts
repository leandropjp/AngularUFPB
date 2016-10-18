import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { loginroutes } from './login.routing';
import { MDL } from './../MaterialDesignLiteUpgradeElement';
import { MDLModule } from './../shared/shared.module';



@NgModule({
    imports: [ReactiveFormsModule, FormsModule, CommonModule, loginroutes, MDLModule],
    exports: [],
    declarations: [SigninComponent, SignupComponent],
    providers: [],
})
export class LoginModule { }
