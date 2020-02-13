import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'rxjs/add/operator/finally';

import { MainService } from '../../services/main.service';

@Component({
  templateUrl: './login.container.html',
  styleUrls: [ './login.container.scss' ]
})
export class LoginComponent {

  loading = false;

  constructor(private main: MainService,
              private router: Router,
              private snackBar: MatSnackBar) {}

  onLogin(login: { username: string, password: string }) {
    if(login.username === "" || login.password === "") {
      this.snackBar.open('Please Enter Username and Password', '', {
          duration: 3000
        });
      return;
    }
    this.loading = true;
    this.main.login(login.username, login.password)
      .finally(
        function() {
          console.log("Finally!");
          this.loading = false;
        })
        // () => this.loading = false)
      .subscribe(
        // function() {
        //   console.log("Redirecting to home!");
        //   this.router.navigate([ '/home' ]);
        // },
        () => this.router.navigate([ '/home' ]),
        (err) => {
          this.loading = false;
          this.snackBar.open(err, '', {
            duration: 3000
        })});
  }

}
