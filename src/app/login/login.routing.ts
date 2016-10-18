import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';



const routesLogin: Routes = [
  { path: '', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
];

export const loginroutes = RouterModule.forChild(routesLogin);
