import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import fetch from 'node-fetch';

import {Storage} from '@ionic/storage';

import {Profile} from './profile.model';
import {ProfileService} from './profile.service';
import {timestampFormat} from '../helpers/timestampFormat';

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
  loadedProfile: Profile = {
    user: {
      id: 0,
      email: '',
      username: '',
      full_name: '',
      password: '',
      phone_number: '',
      location: '',
      avatar: '',
      gender: '',
      following: [],
      follower: [],
    },
    post: [],
  };

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private storage: Storage,
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    this.isAvailable = false;
    this.isUnavailable = false;
    let userToken = await this.storage.get('userToken');
    let response = await fetch(
      'https://cibo-cove-231019.herokuapp.com/api/page/profile/',
      {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: userToken,
        },
      },
    );

    let result = await response.json();
    this.profileService.addProfile(result.data[0]);
    this.loadedProfile = this.profileService.getProfile();

    for (let key of this.loadedProfile.post) {
      key.timestamp = timestampFormat(key.timestamp);

      if (key.tag === 'AVAILABLE' || key.tag === 'EXPIRED') {
        this.isAvailable = true;
      } else if (key.tag === 'UNAVAILABLE') {
        this.isUnavailable = true;
      }
    }

    this.isLoading = false;
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  onClickAdd() {
    this.router.navigateByUrl('/feeds-add-post');
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
