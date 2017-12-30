import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { City } from '../../city';
import { CityService } from '../../services/city/city.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: [ './city-search.component.css' ]
})
export class CitySearchComponent implements OnInit {

  cities$: Observable<City[]>;
  private searchTerms = new Subject<string>();

  cityCtrl: FormControl;

  constructor(private cityService: CityService) {
    this.cityCtrl = new FormControl();
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.cities$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.cityService.searchCities(term)),
    );
  }
}
