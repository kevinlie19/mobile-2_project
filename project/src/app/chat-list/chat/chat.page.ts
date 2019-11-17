import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NavController, IonContent, Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';

import {Chat, EmptyChat, ChatList} from '../chat-list.model';
import {APISetting} from 'src/app/constant/API';
import {timestampFormat} from 'src/app/helpers/timestampFormat';
import {ChatService} from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild('content', {static: false}) content: IonContent;
  loadedMessages: Chat;
  emptyChat: EmptyChat;
  myUser: number;
  otherUser: number;
  msgToSend: string;
  paramId: number;
  userToken: string;
  maxLineLength: number;
  isIos: boolean;
  isRowFull: boolean;
  isLoading: boolean;
  messageArrayLength: number;
  stopRealtimeFetch: boolean;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private platform: Platform,
    private storage: Storage,
    private chatService: ChatService,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.stopRealtimeFetch = false;
    this.route.paramMap.subscribe(async (paramMap) => {
      if (!paramMap.has('chatId')) {
        this.navCtrl.navigateBack('/chat-list');
        return;
      }
      this.paramId = Number(paramMap.get('chatId'));

      this.userToken = await this.storage.get('userToken');
      let response = await fetch(APISetting.API_ENDPOINT + 'page/chat/', {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: this.userToken,
        },
      });

      const result = await response.json();
      this.loadedMessages = result.data[0];
      this.loadedMessages.chat_list = this.loadedMessages.chat_list.filter(
        (message) => {
          return message.id === Number(paramMap.get('chatId'));
        },
      );

      if (this.loadedMessages.chat_list.length === 0) {
        this.emptyChat = this.chatService.getEmptyChat();
        this.loadedMessages.chat_list = [
          {
            id: this.emptyChat.id,
            email: '',
            username: '',
            full_name: this.emptyChat.full_name,
            phone_number: '',
            location: '',
            avatar: this.emptyChat.avatar,
            gender: '',
            following: [],
            follower: [],
            messages: [],
          },
        ];
      }

      for (let keyList of this.loadedMessages.chat_list) {
        for (let keyMessage of keyList.messages) {
          keyMessage.timestamp = timestampFormat(keyMessage.timestamp);
        }
      }
      this.messageArrayLength = this.loadedMessages.chat_list[0].messages.length;
      this.isLoading = false;

      setTimeout(() => {
        this.content.scrollToBottom(300);
        this.refreshMessages();
      }, 10);
    });
    this.maxLineLength = 30;
    if (this.platform.is('ios')) {
      this.isIos = true;
    } else if (this.platform.is('android')) {
      this.isIos = false;
    }
  }

  async refreshMessages() {
    if (this.stopRealtimeFetch === true) {
      return;
    }

    let self = this;

    let response = await fetch(APISetting.API_ENDPOINT + 'page/chat/', {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: self.userToken,
      },
    });
    const result = await response.json();
    self.loadedMessages = result.data[0];
    self.loadedMessages.chat_list = self.loadedMessages.chat_list.filter(
      (message) => {
        return message.id === self.paramId;
      },
    );

    if (self.loadedMessages.chat_list.length === 0) {
      self.loadedMessages.chat_list = [
        {
          id: self.emptyChat.id,
          email: '',
          username: '',
          full_name: self.emptyChat.full_name,
          phone_number: '',
          location: '',
          avatar: self.emptyChat.avatar,
          gender: '',
          following: [],
          follower: [],
          messages: [],
        },
      ];
    }

    for (let keyList of self.loadedMessages.chat_list) {
      for (let keyMessage of keyList.messages) {
        keyMessage.timestamp = timestampFormat(keyMessage.timestamp);
      }
    }

    if (
      self.messageArrayLength < self.loadedMessages.chat_list[0].messages.length
    ) {
      self.messageArrayLength =
        self.loadedMessages.chat_list[0].messages.length;
      setTimeout(() => {
        this.content.scrollToBottom(300);
        this.refreshMessages();
      }, 10);
    } else {
      this.refreshMessages();
    }
  }

  ionViewDidLeave() {
    this.stopRealtimeFetch = true;
  }

  onClickBack() {
    this.navCtrl.back();
  }

  async sendMsg() {
    let body = {
      message: this.msgToSend,
    };
    let response = await fetch(
      APISetting.API_ENDPOINT +
        'feature/chat/' +
        this.loadedMessages.chat_list[0].id,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: this.userToken,
        },
        body: JSON.stringify(body),
      },
    );

    let sendMessageStatus;
    if (response.status === 200) {
      sendMessageStatus = await response.json();
    } else {
      console.log(response);
    }

    if (sendMessageStatus.success === true) {
      this.msgToSend = '';
    } else {
      console.log(sendMessageStatus.message);
      return;
    }
  }

  onKeyAction() {
    if (this.msgToSend) {
      let lines = this.msgToSend.split(/(\r\n|\n|\r)/gm);
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].length > this.maxLineLength) {
          lines[i].concat('\n');
          this.isRowFull = true;
        }
      }
      this.msgToSend = lines.join('');
    }
  }
}
