import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './../cards/homecard/home.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ReservationcardComponent } from './../cards/reservationcard/reservationcard.component';
import { LayoutComponent } from './layout.component';




const routesLayout: Routes = [
  { path: '', component: LayoutComponent, children: [
     { path: '', component: HomeComponent},
      { path: '' , component: HeaderNavComponent, outlet: 'header'},
      { path: '' , component: SideNavComponent, outlet: 'sidenav'},
      { path: 'salas' , component: ReservationcardComponent},

    ]}

];

export const layoutroutes = RouterModule.forChild(routesLayout);
