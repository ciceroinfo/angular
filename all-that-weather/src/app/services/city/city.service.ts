import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// for database
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

import { City } from '../../city';
import { MessageService } from '../message/message.service';

@Injectable()
export class CityService {

  constructor(public db: AngularFireDatabase) {}

  searchCities(term: string): Observable<City[]> {
    return  this.db.list<City>('cities', ref => ref.orderByChild('name').startAt(term).endAt(term  + "\uf8ff" ).limitToLast(10)).valueChanges();
  }

}
