import { Component} from '@angular/core';

import { AngularFire } from 'angularfire2';

 declare var closeDrawer: any;

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
   isAuth = false;
   constructor(private _af: AngularFire) {
       this._af.auth.subscribe(
      user => this._changeState(user),
      error => console.log(error),
      );
    }

    _changeState(user: any = null) {
    if (user) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
 	  // closeDrawer();
    }
    }
}
