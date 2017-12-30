import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  googleLogin() {
    this.authService.googleLogin();
  }

  anonymousLogin() {
    this.authService.anonymousLogin();
  }

}
