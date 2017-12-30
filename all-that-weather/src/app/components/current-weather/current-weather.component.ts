import { Component, OnInit } from '@angular/core';

import { Weather } from '../../weather';
import { Item } from '../../item';
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
  weather$: Observable<Weather[]>;
  items: Observable<Item[]>;
  xxx: any[] = [];
  uid: any;

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
        this.getWeatherByGeo(pos.coords.latitude, pos.coords.longitude)
          .subscribe(data => {
            this.xxx.push(data);
        });
      });
    }

    this.items = this.userService.userItems(this.uid);

    this.items.subscribe(items => {
      items.forEach((item) => {
          if(item.coord.lat && item.coord.lon) {
            this.getWeatherByGeo(item.coord.lat, item.coord.lon)
              .subscribe(data => {
                this.xxx.push(data);
              });
          // } else {
          //   this.getWeatherByCityName(item.name);
          }
      });
    });
  }

  // getWeatherByCityName(cityName: string): void {
  //   this.weather$ = this.apiOpenWeatherMapService.getWeatherByCityName(cityName);
  // }

  getWeatherByGeo(latitude: number, longitude: number): Observable<Weather[]> {
    return this.apiOpenWeatherMapService.getWeatherByGeo(latitude, longitude);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
