import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ContentComponent }    from './content.component';
import { SigninComponent }    from '../signin/signin.component';
import { SignupComponent }    from '../signup/signup.component';

import { routing } from './content.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    ContentComponent,
    SignupComponent,
    SigninComponent

  ],
  providers: [

  ]
})
export class ContentModule {}