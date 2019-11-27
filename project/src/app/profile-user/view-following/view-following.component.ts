import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Storage} from '@ionic/storage';
import {ModalController} from '@ionic/angular';

import {Friend} from '../profile-user.model';
import {APISetting} from 'src/app/constant/API';
import {ProfileUserService} from '../profile-user.service';

@Component({
  selector: 'app-view-following',
  templateUrl: './view-following.component.html',
  styleUrls: ['./view-following.component.scss'],
})
export class ViewFollowingComponent implements OnInit {
  loadedFollowing: Friend[];
  isInputEntered: boolean;
  isHavingFriend: boolean;
  isFriendFound: boolean;
  isLoading: boolean;
  userId: number;

  constructor(
    private modalCtrl: ModalController,
    private storage: Storage,
    private router: Router,
    private profileUserService: ProfileUserService,
  ) {}

  async ngOnInit() {
    this.userId = this.profileUserService.getUserId();
    this.isHavingFriend = true;
    this.isInputEntered = false;
    this.isFriendFound = false;
    this.isLoading = true;
    let userToken = await this.storage.get('userToken');
    let response = await fetch(
      APISetting.API_ENDPOINT + 'feature/following-user/' + this.userId,
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
    const result = await response.json();
    this.loadedFollowing = result.data;

    if (!this.loadedFollowing || this.loadedFollowing.length === 0) {
      this.isHavingFriend = false;
    }
    this.isLoading = false;
  }

  onInputSearch(keyword: string) {
    if (keyword === '') {
      this.isInputEntered = false;
      this.ngOnInit();
    } else {
      this.isInputEntered = true;
    }

    if (!this.isHavingFriend) {
      this.isFriendFound = false;
      return;
    }

    this.loadedFollowing = this.loadedFollowing.filter((friend) => {
      return friend.username.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  viewProfile(id: number) {
    this.modalCtrl.dismiss(null, 'cancel');
    this.router.navigateByUrl('/profile-user/' + id);
  }
}
