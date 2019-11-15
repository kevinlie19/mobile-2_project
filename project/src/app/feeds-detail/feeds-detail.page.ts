import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {
  NavController,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import {Storage} from '@ionic/storage';

import {FeedsService} from '../feeds/feeds.service';
import {FeedDetails, HomeDetails, PostObject} from './feeds-detail.model';
import {ProfileService} from '../profile/profile.service';
import {FeedsDetailService} from './feeds-detail.service';
import {APISetting} from '../constant/API';
import {ProfileUserService} from '../profile-user/profile-user.service';

@Component({
  selector: 'app-feeds-detail',
  templateUrl: './feeds-detail.page.html',
  styleUrls: ['./feeds-detail.page.scss'],
})
export class FeedsDetailPage implements OnInit {
  loadedFeedDetail: FeedDetails;
  loadedHomeDetail: HomeDetails;
  isFeedOwnedByMe: boolean;
  textBuyDate: string;
  textExpDate: string;
  feedId: number;
  isLoading: boolean;
  isFromHomePage: boolean;

  constructor(
    private feedsService: FeedsService,
    private myProfileService: ProfileService,
    private userProfileService: ProfileUserService,
    private feedDetailService: FeedsDetailService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.isFromHomePage = false;
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
        this.loadedFeedDetail = this.userProfileService.getUserProfile();
        this.loadedFeedDetail.post = this.loadedFeedDetail.post.filter(
          (post) => {
            return post.id === this.feedId;
          },
        );
      } else if (paramMap.get('fromPage') === 'feeds') {
        this.isFromHomePage = true;
        this.isFeedOwnedByMe = false;
        this.loadedHomeDetail = this.feedsService.getFeedById(
          Number(paramMap.get('feedsId')),
        );
      }

      this.isLoading = false;

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

      if (
        paramMap.get('fromPage') === 'profile' ||
        paramMap.get('fromPage') === 'profile-user'
      ) {
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
      } else if (paramMap.get('fromPage') === 'feeds') {
        let buyDate = new Date(this.loadedHomeDetail.buy_date);
        this.textBuyDate =
          buyDate.getDate() +
          ' ' +
          months[buyDate.getMonth()] +
          ' ' +
          buyDate.getFullYear();

        let expDate = new Date(this.loadedHomeDetail.exp_date);
        this.textExpDate =
          expDate.getDate() +
          ' ' +
          months[expDate.getMonth()] +
          ' ' +
          expDate.getFullYear();
      }
    });
    console.log(this.loadedFeedDetail);
  }

  onClickBack() {
    this.navCtrl.back();
  }

  async onClickEditUnavailable() {
    let self = this;
    const alert = await self.alertCtrl.create({
      header: 'Alert!',
      message: "You can't edit your unavailable post!",
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

  async onClickRequest(id: number) {
    let self = this;
    self.loadingCtrl
      .create({keyboardClose: true, message: 'Requesting...'})
      .then((loadingEl) => {
        loadingEl.present();

        async function requestFeed() {
          const userToken = await self.storage.get('userToken');
          const apiUrl = APISetting.API_ENDPOINT + 'feature/request/' + id;
          const response = await fetch(apiUrl, {
            mode: 'cors',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              Authorization: userToken,
            },
          });

          const requestPostStatus = await response.json();

          if (requestPostStatus.success === true) {
            loadingEl.dismiss();
            const alert = await self.alertCtrl.create({
              message: 'Successfully Requested!',
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
            const alert = await self.alertCtrl.create({
              header: 'Alert',
              message: requestPostStatus.message,
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
        requestFeed();
      });
  }

  async onClickDelete() {
    const self = this;

    const alert = await self.alertCtrl.create({
      header: "Delete Item along with it's request?",
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
                    const alert = await self.alertCtrl.create({
                      header: 'Alert',
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
