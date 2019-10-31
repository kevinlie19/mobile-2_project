import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import fetch from 'node-fetch';

import {Profile} from './profile.model';
import {ProfileService} from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  flagAvailablePost: boolean;
  flagUnavailablePost: boolean;
  idx: number;
  loadedProfile: Profile = {
    user: {
      id: 0,
      email: '',
      username: '',
      full_name: '',
      password: '',
      telephone: '',
      location: '',
      avatar: '',
      gender: '',
      following: [],
      follower: [],
    },
    post: [],
  };
  loadedPostAvailable: Profile = {
    user: {
      id: 0,
      email: '',
      username: '',
      full_name: '',
      password: '',
      telephone: '',
      location: '',
      avatar: '',
      gender: '',
      following: [],
      follower: [],
    },
    post: [],
  };
  loadedPostUnavailable: Profile = {
    user: {
      id: 0,
      email: '',
      username: '',
      full_name: '',
      password: '',
      telephone: '',
      location: '',
      avatar: '',
      gender: '',
      following: [],
      follower: [],
    },
    post: [],
  };

  constructor(private profileService: ProfileService, private router: Router) {}

  async ngOnInit() {
    this.flagAvailablePost = false;
    this.flagUnavailablePost = false;

    let response = await fetch(
      'https://cibo-cove-231019.herokuapp.com/api/page/profile/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTcyMzMxNTQwfQ.SzEBfwLMu0IQtMebyVaNwgUdDoorCptgS4wyWzW3t0U',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTcyNDQyODI0fQ.U5fV2f9RYNeoIqE7Gr4w-BlVdSGC3-hOM17UfDE5fUI',
        },
      },
    );

    let result = await response.json();
    this.profileService.addProfile(result.data[0]);
    this.loadedProfile = this.profileService.getProfile();
    console.log('HASIL=>', this.loadedProfile);

    for (let key of this.loadedProfile.post) {
      if (key.tag === 'AVAILABLE' || key.tag === 'EXPIRED') {
        this.flagAvailablePost = true;
        this.loadedPostAvailable.post.push(key);
      } else if (key.tag === 'UNAVAILABLE') {
        this.flagUnavailablePost = true;
        this.loadedPostUnavailable.post.push(key);
      }
    }
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
