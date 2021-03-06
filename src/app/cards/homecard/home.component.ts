import { Component, OnInit, OnDestroy, trigger, state, style, animate, transition } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService} from '../shared/auth.service';
import { Category } from './../../Category';
import { User } from './../../shared/user.interface';
import { FirebaseService } from './../../services/firebase.service';
import { Room } from './../../Room';
import { Reservation } from './../../Reservation';

@Component({
  selector: 'app-homecard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
     '[@routeAnimation]': 'true',
     '[style.display]': "'block'",
     '[style.position]': "'absolute'"
   },
  animations: [
    trigger('routeAnimation', [
      state('*', style({transform: 'translateX(0)', opacity: 1})),
      transition('void => *', [
        style({transform: 'translateX(-100%)', opacity: 0}),
        animate(500)
      ]),
      transition('* => void', animate(500, style({transform: 'translateX(100%)', opacity: 0})))
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  reservations: Reservation[];
  categories:Category[];
  rooms:Room[];
  constructor(private _firebaseService:FirebaseService, private router: Router ) {
  
  }

  ngOnInit() {
  	this._firebaseService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this._firebaseService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
    });

    this._firebaseService.getReservation().subscribe(reservations => {
      this.reservations = reservations;
    });



  }

  ngOnDestroy(){
    
  }


}
