import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';

import {NavController} from '@ionic/angular';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';

const {PushNotifications, Modals} = Plugins;

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
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

  ngOnInit() {
    console.log('Initializing HomePage');

    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On succcess, we should be able to receive notifications
    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        // alert('Push registration success, token: ' + token.value);
        console.log('Push registration success, token: ' + token.value);
      },
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotification) => {
        var audio1 = new Audio('assets/audio.mp3');
        console.log('Audio');
        audio1.play();
        // alert('Push received: ' + JSON.stringify(notification));
        console.log('Push received: ', notification);

        let alertRet = Modals.alert({
          title: notification.title,
          message: notification.body,
        });
      },
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
        console.log('Push action performed: ' + notification);
      },
    );
  }
}
