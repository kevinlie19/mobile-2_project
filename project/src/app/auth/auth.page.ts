import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoading = false;
  segment: string = 'login';
  isLogin = true;
  login = true;
  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    // console.log(email, password);

    if (this.isLogin) {
      // Send a request to login servers
    } else {
      // Send a request to signup servers
    }
  }

  onLogin() {
    this.isLoading = true;
    this.loadingCtrl
      .create({keyboardClose: true, message: 'Logging in...'})
      .then((loadingEl) => {
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('home');
        }, 1500);
      });
    this.authService.login();
  }

  onSignUp() {
    this.authService.login();
    this.router.navigateByUrl('set-up-profile');
  }

  changeLogin() {
    this.login = !this.login;
  }
}
