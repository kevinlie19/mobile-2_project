import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ModalController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

import {Friend} from './choose-friend.model';
import {APISetting} from 'src/app/constant/API';
import {ChatService} from '../chat/chat.service';

@Component({
  selector: 'app-choose-friend',
  templateUrl: './choose-friend.component.html',
  styleUrls: ['./choose-friend.component.scss'],
})
export class ChooseFriendComponent implements OnInit {
  loadedFriend: Friend[];
  isInputEntered: boolean;
  isHavingFriend: boolean;
  isFriendFound: boolean;
  isLoading: boolean;

  constructor(
    private modalCtrl: ModalController,
    private storage: Storage,
    private chatService: ChatService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.isHavingFriend = true;
    this.isInputEntered = false;
    this.isFriendFound = false;
    this.isLoading = true;
    let userToken = await this.storage.get('userToken');
    let response = await fetch(
      APISetting.API_ENDPOINT + 'feature/following-user',
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
    this.loadedFriend = result.data;

    if (!this.loadedFriend || this.loadedFriend.length === 0) {
      this.isHavingFriend = false;
    }
    this.isLoading = false;
  }

  chatNow(friend: Friend) {
    this.chatService.addEmptyChat(friend.id, friend.full_name, friend.avatar);
    this.modalCtrl.dismiss(null, 'cancel');
    this.router.navigateByUrl('/chat/' + friend.id);
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

    this.loadedFriend = this.loadedFriend.filter((friend) => {
      return friend.username.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
