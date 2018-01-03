import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { City } from '../../city';

@Injectable()
export class UserService  {

  private cities: Observable<City[]>;
  private citiesRef: AngularFireList<City>;

  constructor(private db: AngularFireDatabase) {}

  userCities(uid: any): Observable<City[]> {
    this.citiesRef = this.db.list<City>(`users/${uid}/cities`).valueChanges();
    //return this.citiesRef.valueChanges();

    this.items = this.itemsRef.snapshotChanges();
    console.log('UserService::userCities::this.items', this.items);
  }

  addCity(city: City): void {
    console.log('UserService::addCity', city);
    this.citiesRef.push(city);
  }
}
