import { Component, OnInit, trigger, state, style, animate, transition } from '@angular/core';

import { Router } from '@angular/router';
import { Category } from './../../Category';
import { User } from './../../shared/user.interface';
import { FirebaseService } from './../../services/firebase.service';
import { Room } from './../../Room';
import { AngularFire } from 'angularfire2';
import { Reservation } from './../../Reservation';

declare var selectField: any;
declare var firebase: any;
declare var changeLocation: any;
@Component({
  selector: 'app-reservationcard',
  templateUrl: './reservationcard.component.html',
  styleUrls: ['./reservationcard.component.css'],
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
export class ReservationcardComponent implements OnInit {
  seg = false;
  ter = false;
  quarta = false;
  quinta = false;
  h1 = false;
  h2 = false;
  h3 = false;
  startDate = '';
  endDate = '';
  categories: Category[];
  rooms: Room[];
  reservations: Reservation[];
  selectedRoom: string;
  constructor(private _firebaseService: FirebaseService, private router: Router, private af: AngularFire ) {

  }

  onChange(deviceValue) {
    this.selectedRoom = deviceValue;
  }


  bookRoom(startDate: string, endDate: string) {
  let created_at = new Date().toString();

     let newReservation = {room: this.selectedRoom,
       startDate: this.startDate,
       endDate: this.endDate,
       userUid: this._firebaseService.user.uid,
       days: this.convertDays(),
       startTime: this.convertTime(),
       endTime: '08:50',
       created_at : created_at};
       this._firebaseService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
    });
       this.checkReservation(this.startDate, this.endDate, this.convertDays(), this.convertTime(), "08:50")

    
       //this._firebaseService.addReservation(newReservation);
  }
  
  checkReservation(startDate, endaDate, days, startTime, endTime){
      for (let reservation of this.reservations) {
        if(reservation.days = days) {
            if (reservation.startTime = startTime){
              if (reservation.endTime = endTime){
                //MESMO DIA E HORARIO START E END
                if (reservation.room = this.selectedRoom) {
                  //MESMO DIA HORARIO START END E MESMA SAALA
                  
                } else {
                  
                }
              } else {
                //MESMO DIA E START NOT END
              }
            } else {
              //MESMO DIA E N MESMO HORARIO
            }
        } else {
            //N EH MESMO DIA
        }
      }
  }

  convertTime(): string {
      if (this.h1) {
        return '08:00';
      }
  }

  convertDays(): number[] {
    let days: number[] = [];
      if (this.seg) {
        days[0] = 1;
      } else {
        days[0] = 0;
      }
      if (this.ter) {
        days[1] = 1;
      } else {
        days[1] = 0;
      }
      if (this.quarta) {
        days[2] = 1;
      } else {
        days[2] = 0;
      }
      if (this.quinta) {
        days[3] = 1;
      } else {
        days[3] = 0;
      }
    return days;
  }

  ngOnInit() {
  changeLocation();
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

}
