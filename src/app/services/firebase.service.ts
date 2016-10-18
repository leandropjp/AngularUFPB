import {Injectable} from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import 'rxjs/add/operator/map';
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';
import {Category} from '../Category';
import {Room} from '../Room';
import { User } from '../shared/user.interface';
import { Router } from '@angular/router';
import { Reservation } from '../Reservation';

declare var firebase: any;
@Injectable()
export class FirebaseService {

    categories: FirebaseListObservable<Category[]>;
    rooms: FirebaseListObservable<Room[]>;
    users: FirebaseListObservable<User[]>;
    storageRef = firebase.storage().ref();
    imagesRef = this.storageRef.child('rooms');
    isAuth = false;
    authColor = 'warn';
    user: User = {};
    userUid = '';
    reservations: FirebaseListObservable<Reservation[]>;
    public activeUser: ReplaySubject<any> = new ReplaySubject(1);

    constructor(private _af: AngularFire, private router: Router) {
        this._af.auth.subscribe(
      user => this._changeState(user),
      error => console.log(error),

    );
    }
    checkReservation(startDate, endDate, days, startTime) {
        if (startDate != null) {
            this.reservations = this._af.database.list('/reservations', {
                query: {
                    orderByChild: 'startTime',
                    equalTo: startTime
    
                }
            }) as
            FirebaseListObservable<Reservation[]>;
        }
        // console.log(this.reservations);
        // this._af.database.object('startTime').subscribe((obj) => {
        //   if (obj.$exists()) {
        //     console.log(obj);
        //   } else {
        //    console.log('nda');
        //   }
        // });
        return this.reservations;
    }
    getRooms(category: string = null) {
        if (category != null) {
            this.rooms = this._af.database.list('/rooms', {
                query: {
                    orderByChild: 'category',
                    equalTo: category
                }
            }) as
            FirebaseListObservable<Room[]>;
        } else {
            this.rooms = this._af.database.list('/rooms') as
            FirebaseListObservable<Room[]>;
        }

        return this.rooms;
    }

    getUser(userId: string = null) {
        this.users = this._af.database.list('/users', {
            query: {
                equalTo : userId
            }
        }) as FirebaseListObservable<User[]>;
    }

    addUsers(newUser) {
        return this.users.push(newUser);
    }

    getCategories() {
        this.categories = this._af.database.list('/categories') as
        FirebaseListObservable<Category[]>;
        return this.categories;
    }

    updateRoom(key, updBusiness) {
        return this.rooms.update(key, updBusiness);
    }

    deleteRoom(key) {
        return this.rooms.remove(key);
    }

    addRoom(newRoom) {
        return this.rooms.push(newRoom);
    }

    getReservation() {
        this.reservations = this._af.database.list('/reservations') as
        FirebaseListObservable<Reservation[]>;
        return this.reservations;
    }

    addReservation(newReservation) {
        return this.reservations.push(newReservation);
    }



  login(from: string) {
    this._af.auth.login({
      provider: this._getProvider(from),
      method : AuthMethods.Popup

    });
  }
  logout() {
    this._af.auth.logout();
  }

  private _changeState(user: any = null) {
    if (user) {
      this.isAuth = true;
      this.authColor = 'primary';
      this.activeUser.next(this._getUserInfo(user));
      
      this.router.navigate(['home']);

    } else {
      this.isAuth = false;
      this.authColor = 'warn';
      this.user = {};
    }
  }

  private _getUserInfo(user: any): any {
    if (!user) {
      return {};
    }
    let data = user.auth.providerData[0];
    let newUser = {
      name: data.displayName,
      avatar: data.photoURL,
      email: data.email,
      provider: data.providerId,
      uid: user.uid
    };
    this.user = newUser;
    return newUser;
  }

  private _getProvider(from: string) {
    switch (from) {
      case 'twitter': return AuthProviders.Twitter;
      case 'facebook': return AuthProviders.Facebook;
      case 'github': return AuthProviders.Github;
      case 'google': return AuthProviders.Google;
    }
  }
}
