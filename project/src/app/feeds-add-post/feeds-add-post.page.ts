import {Feeds} from './../feeds/feeds.model';
import {Router} from '@angular/router';
import {OnInit, Component} from '@angular/core';
import {
  NavController,
  Platform,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {AppService} from '../app.service';
import {APISetting} from '../constant/API';

import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-feeds-add-post',
  templateUrl: './feeds-add-post.page.html',
  styleUrls: ['./feeds-add-post.page.scss'],
})
export class FeedsAddPostPage implements OnInit {
  tag: string;
  currentDate: string;
  scanBarcodeFeeds: Feeds = {
    id: 0,
    user_id: 0,
    item_name: '',
    tag: 'Available',
    category: '',
    description: '',
    buy_date: '',
    exp_date: '',
    timestamp: '',
    image: '',
    full_name: '',
    username: '',
    location: '',
    avatar: '',
  };

  constructor(
    private loadingCtrl: LoadingController,
    private plt: Platform,
    private navCtrl: NavController,
    private localNotifications: LocalNotifications,
    private router: Router,
    private alertController: AlertController,
    private appService: AppService,
    private storage: Storage,
  ) {
    this.localNotifications.on('click').subscribe((notification) => {
      this.router.navigateByUrl('/request');
    });
  }

  ngOnInit() {
    this.scanBarcodeFeeds = this.appService.getAllScanBarcodeFeeds();
    this.currentDate = new Date().toISOString();
  }

  onClickClose() {
    this.navCtrl.back();
  }

  async addPost() {
    if (
      this.scanBarcodeFeeds.image === '' ||
      this.scanBarcodeFeeds.item_name === '' ||
      !this.scanBarcodeFeeds.buy_date ||
      !this.scanBarcodeFeeds.exp_date ||
      this.scanBarcodeFeeds.category === '' ||
      this.scanBarcodeFeeds.description === '' ||
      !this.scanBarcodeFeeds.tag
    ) {
      let alert = await this.alertController.create({
        message: 'Please fill all fields',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              return;
            },
          },
        ],
      });
      await alert.present();
      return;
    }
    const self = this;
    let userToken = await this.storage.get('userToken');

    this.loadingCtrl
      .create({keyboardClose: true, message: 'Saving ...'})
      .then((loadingEl) => {
        loadingEl.present();

        async function getDataFromAPI() {
          const body = {
            image: self.scanBarcodeFeeds.image,
            item_name: self.scanBarcodeFeeds.item_name,
            buy_date: self.scanBarcodeFeeds.buy_date,
            exp_date: self.scanBarcodeFeeds.exp_date,
            category: self.scanBarcodeFeeds.category,
            description: self.scanBarcodeFeeds.description,
            tag: self.scanBarcodeFeeds.tag,
          };

          let response = await fetch(
            APISetting.API_ENDPOINT + 'feature/add-post',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                authorization: userToken,
              },
              body: JSON.stringify(body),
            },
          );

          let postStatus;
          if (response.status === 200) {
            postStatus = await response.json();
          } else {
            console.log(response);
            loadingEl.dismiss();
          }

          if (postStatus.success === true) {
            loadingEl.dismiss();
            let alert = await self.alertController.create({
              message: 'Post Successfully Added!',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    self.navCtrl.navigateBack('/feeds');
                  },
                },
              ],
            });
            await alert.present();
          } else {
            loadingEl.dismiss();
            let alert = await this.alertCtrl.create({
              title: 'Alert',
              message: postStatus.message,
              buttons: [
                {
                  text: 'OK',
                  handler: () => {},
                },
              ],
            });
            await alert.present();
            return;
          }
        }
        getDataFromAPI();
      });

    this.localNotifications.schedule({
      text: 'Hi! You you have a new request!',
      trigger: {at: new Date(new Date().getTime() + 5000)},
      led: 'FF0000',
      sound: 'file://sound.mp3',
      smallIcon: '../../assets/images/LogoCibo.png',
      icon: '../../assets/images/LogoCibo.png',
      vibrate: true,
    });
    this.appService.resetScanBarcodeFeeds();
    this.router.navigateByUrl('/feeds');
  }
}
