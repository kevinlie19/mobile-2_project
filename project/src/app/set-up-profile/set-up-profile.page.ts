import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-set-up-profile',
  templateUrl: './set-up-profile.page.html',
  styleUrls: ['./set-up-profile.page.scss'],
})
export class SetUpProfilePage implements OnInit {

  isLoading = false;
  isSignUp = true;

  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  next() {
    this.isLoading = true;
    this.loadingCtrl
      .create({keyboardClose: true, message: 'Signing in...'})
      .then((loadingEl) => {
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('home');
        }, 1500);
      });
  }

  onSubmit(form: NgForm){
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    // console.log(email, password);

    if (this.isSignUp) {
      // Send a request to login servers
    } else {
      // Send a request to signup servers
    }
  }
}
