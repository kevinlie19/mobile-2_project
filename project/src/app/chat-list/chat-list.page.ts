import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {NavController, ModalController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

import {Chat} from './chat-list.model';
import {APISetting} from '../constant/API';
import {timestampFormat} from '../helpers/timestampFormat';
import {ChooseFriendComponent} from './choose-friend/choose-friend.component';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {
  loadedChatList: Chat;
  isLoading: boolean;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage,
    private modalCtrl: ModalController,
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    let userToken = await this.storage.get('userToken');
    let response = await fetch(APISetting.API_ENDPOINT + 'page/chat/', {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: userToken,
      },
    });

    const result = await response.json();
    this.loadedChatList = result.data[0];
    this.isLoading = false;
    for (let keyList of this.loadedChatList.chat_list) {
      for (let keyMessage of keyList.messages) {
        keyMessage.timestamp = timestampFormat(keyMessage.timestamp);
      }
    }
  }

  async doRefresh(event) {
    let userToken = await this.storage.get('userToken');
    let response = await fetch(APISetting.API_ENDPOINT + 'page/chat/', {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: userToken,
      },
    });

    const result = await response.json();
    this.loadedChatList = result.data[0];
    this.isLoading = false;
    for (let keyList of this.loadedChatList.chat_list) {
      for (let keyMessage of keyList.messages) {
        keyMessage.timestamp = timestampFormat(keyMessage.timestamp);
      }
    }
    event.target.complete();
  }

  chooseFriend() {
    this.modalCtrl
      .create({component: ChooseFriendComponent})
      .then((modalElement) => {
        modalElement.present();
      });
  }

  onClickBack() {
    this.navCtrl.navigateBack('/feeds');
  }
}
