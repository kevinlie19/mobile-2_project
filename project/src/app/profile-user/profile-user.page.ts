import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

import {UserProfile} from './profile-user.model';
import {ProfileUserService} from './profile-user.service';
import {APISetting} from '../constant/API';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.page.html',
  styleUrls: ['./profile-user.page.scss'],
})
export class ProfileUserPage implements OnInit {
  idx: number;
  isLoading: boolean;
  isAvailable: boolean;
  isUnavailable: boolean;
  loadedUserProfile: UserProfile;
  isFollowed: boolean;
  userToken: string;
  userId: number;
  postAvailable: any;
  postUnavailable: any;

  constructor(
    private userProfileService: ProfileUserService,
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private storage: Storage,
  ) {}

  async ngOnInit() {
    this.isFollowed = false;
    this.route.paramMap.subscribe(async (paramMap) => {
      if (!paramMap.has('userId')) {
        this.navCtrl.back();
        return;
      }

      this.userId = Number(paramMap.get('userId'));
      this.isLoading = true;
      this.isAvailable = false;
      this.isUnavailable = false;
      this.userToken = await this.storage.get('userToken');
      let responseOtherUser = await fetch(
        APISetting.API_ENDPOINT + 'page/profile/' + this.userId,
        {
          mode: 'cors',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: this.userToken,
          },
        },
      );

      const resultOtherUser = await responseOtherUser.json();

      let responseMyUser = await fetch(
        APISetting.API_ENDPOINT + 'page/profile/',
        {
          mode: 'cors',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: this.userToken,
          },
        },
      );

      const resultMyUser = await responseMyUser.json();

      this.userProfileService.addUserProfile(resultOtherUser.data[0]);
      this.loadedUserProfile = this.userProfileService.getUserProfile();

      this.postAvailable = this.loadedUserProfile.post.filter((item) => {
        return item.tag.toLowerCase() !== 'unavailable';
      });
      this.postUnavailable = this.loadedUserProfile.post.filter((item) => {
        return item.tag.toLowerCase() === 'unavailable';
      });

      for (let key of resultMyUser.data[0].user[0].following) {
        let obj = JSON.parse(key);
        if (obj.id === paramMap.get('userId')) {
          this.isFollowed = true;
        }
      }

      for (let key of this.loadedUserProfile.post) {
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
    });
  }

  onClickBack() {
    this.navCtrl.back();
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

  async onClickFollow() {
    let self = this;
    self.isLoading = true;
    self.isFollowed = true;
    let responseFollow = await fetch(
      APISetting.API_ENDPOINT + 'feature/follow/' + self.userId,
      {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: self.userToken,
        },
      },
    );

    let followAPIStatus;
    if (responseFollow.status === 200) {
      followAPIStatus = await responseFollow.json();
    } else {
      console.log(responseFollow);
    }
    if (followAPIStatus.success === true) {
      this.isLoading = false;
    }
  }

  async onClickUnfollow() {
    let self = this;
    self.isLoading = true;
    self.isFollowed = false;
    let responseUnfollow = await fetch(
      APISetting.API_ENDPOINT + 'feature/follow/' + self.userId,
      {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: self.userToken,
        },
      },
    );

    let unfollowAPIStatus;
    if (responseUnfollow.status === 200) {
      unfollowAPIStatus = await responseUnfollow.json();
    } else {
      console.log(responseUnfollow);
    }
    if (unfollowAPIStatus.success === true) {
      self.isLoading = false;
    }
  }
}
