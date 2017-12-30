import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'current-weather', component: CurrentWeatherComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
