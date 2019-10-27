import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-feeds-add-post',
  templateUrl: './feeds-add-post.page.html',
  styleUrls: ['./feeds-add-post.page.scss'],
})
export class FeedsAddPostPage implements OnInit {
  constructor(
    private plt: Platform,
    private navCtrl: NavController,
    private localNotifications: LocalNotifications,
    private router: Router) {
    this.localNotifications.on('click').subscribe(notification => {
      this.router.navigateByUrl('/request');
    });
  }

  ngOnInit() {}

  onClickClose() {
    this.navCtrl.setDirection('back');
  }

  addPost(){
    this.localNotifications.schedule({
      text: 'Hi! You you have a new request!',
      trigger: { at: new Date(new Date().getTime() + 5000) },
      led: 'FF0000',
      sound:  'file://sound.mp3',
      smallIcon: '../../assets/images/LogoCibo.png',
      icon: '../../assets/images/LogoCibo.png',
      vibrate: true,
    });
    this.router.navigateByUrl('/feeds');
  }
}
