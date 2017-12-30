import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { Item } from '../../item';

@Injectable()
export class UserService  {

  constructor(private db: AngularFireDatabase) {}

  userItems(uid: any): Observable<Item[]> {
    return this.db.list<Item>(`users/${uid}/items`).valueChanges();
  }
}
