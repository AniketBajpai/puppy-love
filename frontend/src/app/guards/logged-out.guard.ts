import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { MainService } from '../services/main.service';

@Injectable()
export class LoggedOutGuard implements CanActivate {
  constructor(private router: Router,
              private main: MainService) {}

  canActivate() {
    console.log("logged-out guard");
    
    if (this.main.loggedIn) {
      console.log("loggedIn");
      this.router.navigate([ '/home' ]);
    } else {
      console.log("not loggedIn");
    }
    return !this.main.loggedIn;
  }
}
