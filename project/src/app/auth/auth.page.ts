import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingController, AlertController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

import {AuthService} from './auth.service';
import {APISetting} from '../constant/API';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading: boolean = false;
  segment: string = 'login';
  login: boolean = true;

  name: string;
  password: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    public alertController: AlertController,
  ) {}

  ngOnInit() {
    this.name = '';
    this.password = '';
  }

  onSubmitSignIn(form: NgForm) {
    const self = this;
    this.isLoading = true;

    const email = form.value.name.trim().toLowerCase();
    const password = form.value.password;

    this.loadingCtrl
      .create({keyboardClose: true, message: 'Signing in...'})
      .then((loadingEl) => {
        loadingEl.present();

        async function getDataFromAPI() {
          const body = {
            credential: email,
            password,
          };

          const response = await fetch(
            APISetting.API_ENDPOINT + 'auth/sign-in',
            {
              mode: 'cors',
              method: 'POST',
              body: JSON.stringify(body),
              headers: {'Content-Type': 'application/json'},
            },
          );

          let signInStatus;
          if (response.status === 200) {
            signInStatus = await response.json();
          } else {
            console.log(response);
            loadingEl.dismiss();
          }

          if (signInStatus.success === true) {
            loadingEl.dismiss();
            self.authService.login();
            self.storage.set('userToken', signInStatus.token);
            self.router.navigateByUrl('/feeds');
          } else {
            loadingEl.dismiss();
            const alert = await self.alertController.create({
              header: 'Alert',
              message: signInStatus.message,
              buttons: ['OK'],
            });
            await alert.present();
          }
        }
        getDataFromAPI();
      });
    if (!form.valid) {
      return;
    }
  }

  async onSubmitSignUp(form: NgForm) {
    this.isLoading = true;

    let match = true;

    const email = form.value.email.trim().toLowerCase();
    const username = form.value.username.trim().toLowerCase();
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;

    if (password !== confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Confirm password does not match',
        buttons: ['OK'],
      });
      match = false;
      await alert.present();
    }
    if (match === false) {
      return;
    }

    this.authService.setUserInfo(email, username, password);
    this.authService.login();
    this.router.navigateByUrl('set-up-profile');

    if (!form.valid) {
      return;
    }
  }

  onSignUp() {
    this.authService.login();
    this.router.navigateByUrl('set-up-profile');
  }

  changeLogin() {
    this.login = !this.login;
  }
}
