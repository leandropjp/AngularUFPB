import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const appRoutes: Routes = [
{ path: '', redirectTo: '/login', pathMatch: 'full'},
{ path: 'login', loadChildren: 'app/login/login.module#LoginModule'},
{ path: 'home', canActivate: [AuthGuard] , loadChildren: 'app/layout/layout.module#LayoutModule'},
];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
