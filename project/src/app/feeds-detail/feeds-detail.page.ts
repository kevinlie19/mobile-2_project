import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {
  NavController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import {Storage} from '@ionic/storage';

import {FeedsService} from '../feeds/feeds.service';
import {FeedDetails} from './feeds-detail.model';
import {ProfileService} from '../profile/profile.service';
import {FeedsDetailService} from './feeds-detail.service';
import {APISetting} from '../const/API';

@Component({
  selector: 'app-feeds-detail',
  templateUrl: './feeds-detail.page.html',
  styleUrls: ['./feeds-detail.page.scss'],
})
export class FeedsDetailPage implements OnInit {
  loadedFeedDetail: FeedDetails;
  isFeedOwnedByMe: boolean;
  textBuyDate: string;
  textExpDate: string;
  feedId: number;

  constructor(
    private feedsService: FeedsService,
    private myProfileService: ProfileService,
    private feedDetailService: FeedsDetailService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('fromPage') && !paramMap.has('feedsId')) {
        this.navCtrl.back();
        return;
      }

      this.feedId = Number(paramMap.get('feedsId'));

      if (paramMap.get('fromPage') === 'profile') {
        this.isFeedOwnedByMe = true;
        this.loadedFeedDetail = this.myProfileService.getProfile();
        this.loadedFeedDetail.post = this.loadedFeedDetail.post.filter(
          (post) => {
            return post.id === this.feedId;
          },
        );
        this.feedDetailService.addFeed(this.loadedFeedDetail);
      } else if (paramMap.get('fromPage') === 'profile-user') {
        this.isFeedOwnedByMe = false;
        // akan di-update setelah page profile-user selesai di-connect
      } else if (paramMap.get('fromPage') === 'feeds') {
        this.isFeedOwnedByMe = false;
        // akan di-update setelah page feeds selesai di-connect
      }

      let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      let buyDate = new Date(this.loadedFeedDetail.post[0].buy_date);
      this.textBuyDate =
        buyDate.getDate() +
        ' ' +
        months[buyDate.getMonth()] +
        ' ' +
        buyDate.getFullYear();

      let expDate = new Date(this.loadedFeedDetail.post[0].exp_date);
      this.textExpDate =
        expDate.getDate() +
        ' ' +
        months[expDate.getMonth()] +
        ' ' +
        expDate.getFullYear();
    });
  }

  onClickBack() {
    this.navCtrl.back();
  }

  onClickRequest() {
    // akan di-update setelah sistem API request sudah fix
  }

  async onClickDelete() {
    const self = this;

    const alert = await self.alertCtrl.create({
      header: 'Delete Item?',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
        },
        {
          text: 'DELETE',
          handler: async () => {
            self.loadingCtrl
              .create({keyboardClose: true, message: 'Deleting Post...'})
              .then((loadingEl) => {
                loadingEl.present();

                async function deleteFeed() {
                  const userToken = await self.storage.get('userToken');
                  const apiUrl =
                    APISetting.API_ENDPOINT +
                    'feature/delete-post/' +
                    self.feedId;
                  const response = await fetch(apiUrl, {
                    mode: 'cors',
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*',
                      Authorization: userToken,
                    },
                  });

                  const deletePostStatus = await response.json();

                  if (deletePostStatus.success === true) {
                    loadingEl.dismiss();
                    const alert = await self.alertCtrl.create({
                      message: 'Post Successfully Deleted!',
                      buttons: [
                        {
                          text: 'OK',
                          handler: () => {
                            self.navCtrl.back();
                          },
                        },
                      ],
                    });
                    await alert.present();
                  } else {
                    loadingEl.dismiss();
                    const alert = await this.alertCtrl.create({
                      title: 'Alert',
                      message: deletePostStatus.message,
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
                deleteFeed();
              });
          },
        },
      ],
    });
    await alert.present();
  }
}
