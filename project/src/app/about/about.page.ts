import {Router} from '@angular/router';
import {Component} from '@angular/core';

import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {
  constructor(private navCtrl: NavController, private route: Router) {}

  count = 0;

  onClickBack() {
    this.navCtrl.navigateBack('/profile');
  }

  goToTokenNotification() {
    this.count += 1;
    if (this.count === 4) {
      this.route.navigateByUrl('token-notification');
    }
  }
}
