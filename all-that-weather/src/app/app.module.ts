import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { AngularFireModule }         from 'angularfire2';
// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule }     from 'angularfire2/auth';

import { MatInputModule }           from '@angular/material';
import { MatCardModule }            from '@angular/material/card';
import { MatListModule }            from '@angular/material/list';
import { MatGridListModule }        from '@angular/material/grid-list';
import { MatButtonModule }          from '@angular/material/button';
import { MatAutocompleteModule }    from '@angular/material/autocomplete';
import { MatFormFieldModule }       from '@angular/material/form-field';
import { MatSlideToggleModule }     from '@angular/material/slide-toggle';

import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { HttpClientModule }         from '@angular/common/http';
import { AppRoutingModule }         from './app-routing.module';

import { AppComponent }             from './app.component';
import { LoginComponent }           from './components/login/login.component';
import { CurrentWeatherComponent }  from './components/current-weather/current-weather.component';
import { MessagesComponent }        from './components/messages/messages.component';
import { CitySearchComponent }      from './components/city-search/city-search.component';

import { ApiOpenWeatherMapService } from './services/api-openweathermap/api-openweathermap.service';
import { MessageService }           from './services/message/message.service';
import { CityService }              from './services/city/city.service';
import { AuthService }              from './services/auth/auth.service';
import { UserService }              from './services/user/user.service';

export const firebaseConfig = {
  apiKey: "AIzaSyAn2-AsBYkYdMLsJ6rQWT8Kdz_U8PmlMlg",
  authDomain: "all-that-weather.firebaseapp.com",
  databaseURL: "https://all-that-weather.firebaseio.com",
  projectId: "all-that-weather",
  storageBucket: "all-that-weather.appspot.com",
  messagingSenderId: "515901548511"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CurrentWeatherComponent,
    MessagesComponent,
    CitySearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSlideToggleModule
  ],
  providers: [ MessageService, CityService, AuthService, UserService, ApiOpenWeatherMapService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
