import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Storage} from '@ionic/storage';

import {Profile} from './profile.model';
import {ProfileService} from './profile.service';
import {APISetting} from '../constant/API';
import {ModalController} from '@ionic/angular';
import {ViewFollowerComponent} from './view-follower/view-follower.component';
import {ViewFollowingComponent} from './view-following/view-following.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  idx: number;
  isLoading: boolean;
  isAvailable: boolean;
  isUnavailable: boolean;
  loadedProfile: Profile;
  postAvailable: any;
  postUnavailable: any;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private storage: Storage,
    private modalCtrl: ModalController,
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    this.isAvailable = false;
    this.isUnavailable = false;
    let userToken = await this.storage.get('userToken');
    let response = await fetch(APISetting.API_ENDPOINT + 'page/profile/', {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: userToken,
      },
    });

    const result = await response.json();

    this.profileService.addProfile(result.data[0]);
    this.loadedProfile = this.profileService.getProfile();
    this.postAvailable = this.loadedProfile.post.filter((item) => {
      return item.tag.toLowerCase() !== 'unavailable';
    });
    this.postUnavailable = this.loadedProfile.post.filter((item) => {
      return item.tag.toLowerCase() === 'unavailable';
    });

    for (let key of this.loadedProfile.post) {
      if (
        key.tag.toLowerCase() === 'available' ||
        key.tag.toLowerCase() === 'expired'
      ) {
        this.isAvailable = true;
      } else if (key.tag.toLowerCase() === 'unavailable') {
        this.isUnavailable = true;
      }
    }
    this.isLoading = false;
  }

  viewFollower() {
    this.modalCtrl
      .create({component: ViewFollowerComponent})
      .then((modalElement) => {
        modalElement.present();
      });
  }

  viewFollowing() {
    this.modalCtrl
      .create({component: ViewFollowingComponent})
      .then((modalElement) => {
        modalElement.present();
      });
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  onClickAdd() {
    this.router.navigateByUrl('/add-item');
  }

  onClickRequest() {
    this.router.navigateByUrl('/request');
  }

  onClickSearch() {
    this.router.navigateByUrl('/search');
  }

  onClickProfile() {
    this.router.navigateByUrl('/profile');
  }

  onClickHome() {
    this.router.navigateByUrl('/feeds');
  }
}
