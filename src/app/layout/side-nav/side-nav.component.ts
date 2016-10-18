import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { Category } from './../../Category';
import { Room } from './../../Room';
import { FirebaseService } from './../../services/firebase.service';



declare var firebase: any;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})

export class SideNavComponent implements OnInit {

  categories: Category[];
  rooms: Room[];
  appState: string;
  activeKey: string;
  cb1 = false;
  pj = false;
  activeCompany: string;
  activeCategory: string;
  activeYearsInBusiness: string;
  activeDescription: string;
  activePhone: string;
  activeEmail: string;
  activeStreetAddress: string;
  activeCity: string;
  activeState: string;
  activeZipcode: string;
  user = {};

  constructor(private _firebaseService: FirebaseService, private router: Router ) {

  }

  logout() {
        firebase.auth().signOut();
        this.router.navigate(['/login']);
    }

  ngOnInit() {
    this._firebaseService.activeUser.subscribe(user => {
      user.avatar = user.avatar || 'http://www.american.edu/uploads/profiles/large/chris_palmer_profile_11.jpg';
      this.user = user;

     }
    );
  }

  changeState(state, key?) {
    console.log('Changing state to: ' + state);
    if (key) {
      console.log('Changing key to: ' + key);
      this.activeKey = key;
    }
    this.appState = state;
  }



  // filterCategory(category){
  //   this._firebaseService.getBusinesses(category).subscribe(businesses => {
  //     this.businesses = businesses;
  //   });
  // }

  addRoom(name: string,
    address: string,
    capacity: string) {
    let created_at = new Date().toString();

    let newRoom = {
      name: name,
      address: address,
      cold: this.cb1,
      projector : this.pj,
      created_at: created_at
    };

    // console.log(newBusiness);
    this._firebaseService.addRoom(newRoom);
    this.cb1 = false;
    this.pj = false;
    this.changeState('default');

  }

   deleteRoom(key) {
    this._firebaseService.deleteRoom(key);
    this.changeState('default');
  }


  showEdit(business) {
    this.changeState('edit', business.$key);
    this.activeCompany = business.company;
    this.activeCategory = business.category;
    this.activeYearsInBusiness = business.years_in_business;
    this.activeDescription = business.description;
    this.activePhone = business.phone;
    this.activeEmail = business.email;
    this.activeStreetAddress = business.street_address;
    this.activeCity = business.city;
    this.activeState = business.state;
    this.activeZipcode = business.zipcode;
  }

  updateRoom() {
    let updBusiness = {
      company: this.activeCompany,
      description: this.activeDescription,
      category: this.activeCategory,
      years_in_business : this.activeYearsInBusiness,
      street_address: this.activeStreetAddress,
      city: this.activeCity,
      state: this.activeState,
      zipcode: this.activeZipcode,
      phone: this.activePhone,
      email: this.activeEmail,
    };

    this._firebaseService.updateRoom(this.activeKey, updBusiness);

    this.changeState('default');
  }


  clickedCard() {
    console.log('working');
  }

}
