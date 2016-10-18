import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ContentComponent} from '../content/content.component'
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { AuthGuard } from "../shared/auth.guard";
import { HomeComponent } from '../homecard/home.component';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import {ReservationcardComponent} from '../reservationcard/reservationcard.component'
import { LoginComponent } from '../login/login.component';
import { LayoutComponent } from '../layout/layout.component';

const appRoutes: Routes = [

  	{ path: 'home',children:[
  	  { path: '', component: ContentComponent},
     // { path: '', component: HomeComponent},
      { path: '' , component: HeaderNavComponent, outlet: 'header'},
      { path: '' , component: SideNavComponent, outlet: 'sidenav'},
      { path: 'salas' , component: ReservationcardComponent},
     
    ]}

];






export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);