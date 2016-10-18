import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutComponent } from './layout.component';
import { ContentComponent } from './content/content.component';
import { CommonModule } from '@angular/common';
import { layoutroutes } from './layout.routing';
import { HomeComponent } from './../cards/homecard/home.component';
import { ReservationcardComponent } from './../cards/reservationcard/reservationcard.component';
import { SelectfieldComponent } from './../selectfield/selectfield.component';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { FormsModule } from '@angular/forms';
import { MDLModule } from './../shared/shared.module';
import { ScheduleModule } from './../shared/schedule.module';



@NgModule({
    imports: [CommonModule, layoutroutes, FormsModule, MDLModule, ScheduleModule],
    exports: [],
    declarations: [HeaderNavComponent, SideNavComponent, LayoutComponent, ContentComponent, HomeComponent, 
    ReservationcardComponent, SelectfieldComponent, PolymerElement('vaadin-date-picker')],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutModule { }
