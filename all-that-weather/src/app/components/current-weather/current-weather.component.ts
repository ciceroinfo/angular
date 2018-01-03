import { Component, OnInit } from '@angular/core';

import { Weather } from '../../weather';
import { City } from '../../City';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { ApiOpenWeatherMapService } from '../../services/api-openweathermap/api-openweathermap.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  name: string;
  cities: Observable<City[]>;
  weather$: any[] = [];
  uid: any;
  city: any;
  unit: string = "metric";

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private apiOpenWeatherMapService: ApiOpenWeatherMapService ) {
      this.name = authService.currentUserDisplayName;
      this.uid = authService.currentUserId;
    }

  ngOnInit(): void {

   if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.getWeatherByGeo(pos.coords.latitude, pos.coords.longitude);
      });
    }

    this.cities = this.userService.userCities(this.uid);

    this.cities.subscribe(cities => {
      cities.forEach((city) => {
          if(city.coord.lat && city.coord.lon) {
            this.getWeatherByGeo(city.coord.lat, city.coord.lon);
           } else {
            this.getWeatherByCityName(city.name);
          }
      });
    });
  }

  getWeatherByCityName(cityName: string): void {
    this.apiOpenWeatherMapService.getWeatherByCityName(cityName, this.unit)
      .subscribe(data => {
        this.weather$.push(data);
      });
  }

  getWeatherByGeo(latitude: number, longitude: number): void {
    this.apiOpenWeatherMapService.getWeatherByGeo(latitude, longitude, this.unit)
      .subscribe(data => {
        this.weather$.push(data);
      });
  }

  addCity(city: City) {
    console.log('this.cityXXXX', city);
    if(typeof city === 'object') {
      console.log('city intanceof City', this.cities);

      //this.cities.subscribe(cities => cities.push(city));

      this.userService.addCity(city);
    }
    let path = `users/${this.uid}`; // Endpoint on firebase
    console.log('path', path);
    // let user = {
    //               id: this.currentUserId,
    //               email: this.authState.email,
    //               name: this.authState.displayName,
    //               cities:[
    //                 {
    //                   id: '1',
    //                   name: 'London',
    //                   country: 'GB',
    //                   coord: {
    //                     lon: -0.13,
    //                     lat: 51.51
    //                   }
    //                 }
    //               ]
    //             }
    //
    // this.db.object(path).update(user)
    //   .then(() => this.afterSignIn())
    //   .catch(error => console.log(error));
  }

  signOut(): void {
    this.authService.signOut();
  }
}
