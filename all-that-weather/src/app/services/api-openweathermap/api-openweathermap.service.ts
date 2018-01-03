import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { Weather } from '../../weather';
import { MessageService } from '../message/message.service';

@Injectable()
export class ApiOpenWeatherMapService {

  private apiUrl: string = 'http://api.openweathermap.org/data/2.5/weather?appid=dcc9adb1d7fb7bf49346784de299f90a';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET current weather from the server */
  getWeatherByCityName (cityName: string, unit: string = 'metric'): Observable<Weather[]> {
    return this.http.get<Weather[]>(this.apiUrl + '&units=' + unit + '&q=' + cityName)
      .pipe(
        tap(null),
        catchError(this.handleError('getWeather', []))
      );
  }

  /** GET heroes from the server */
  getWeatherByGeo(lat: number, lon: number, unit: string = 'metric'): Observable<Weather[]> {
    return this.http.get<Weather[]>((this.apiUrl + '&units=' + unit + '&lat=' + lat + '&lon=' + lon).toString())
      .pipe(
        tap(null),
        catchError(this.handleError('getWeatherByGeo', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ApiOpenWeatherMapService: ' + message);
  }
}
