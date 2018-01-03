import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { City } from '../../city';
import { CityService } from '../../services/city/city.service';

export class User {
  constructor(public name: string) { }
}

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: [ './city-search.component.css' ],
  outputs: ['update']
})
export class CitySearchComponent implements OnInit {

  cityFormControl = new FormControl();

  city: string | City;
  update = new EventEmitter<string | City>();


  constructor(private cityService: CityService) {}

  ngOnInit(): void {

    this.filteredCities = this.cityFormControl.valueChanges
      .pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(500),
        // ignore new term if same as previous term
        distinctUntilChanged(),
        map(city => city && typeof city === 'object' ? city.name : city),
        // switch to new search observable each time the term changes
        switchMap((term: string) => this.cityService.searchCities(term))
      );
  }

  displayFn(city: any): any {
    return city ? city.name : city;
  }

  addItem() {
    this.update.emit(
      this.cityFormControl.value
    );
  }

  filteredCities: Observable<User[]>;

 //  filter(name: string): User[] {
 //    console.log('filter::name', name);
 //   return this.options.filter(option =>
 //     option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
 // }

}
