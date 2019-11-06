import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NavController, IonContent, Platform} from '@ionic/angular';

import {ChatListService} from '../chat-list.service';
import {Chat} from '../chat-list.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild('scrollElement', {static: false}) content: IonContent;
  loadedMessage: Chat;
  myUser: number;
  otherUser: number;
  msgToSend: string;
  paramId: number;
  maxLineLength: number;
  isIos: boolean;
  isRowFull: boolean;

  constructor(
    private chatService: ChatListService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private platform: Platform,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('chatId')) {
        this.navCtrl.navigateBack('/chat-list');
        return;
      }
      this.paramId = Number(paramMap.get('chatId'));
      this.loadedMessage = this.chatService.getChatListById(
        Number(paramMap.get('chatId')),
      );
    });

    this.myUser = 2;
    this.otherUser = 1;
    this.maxLineLength = 30;
    if (this.platform.is('ios')) {
      this.isIos = true;
    } else if (this.platform.is('android')) {
      this.isIos = false;
    }
  }

  ionViewDidEnter() {
    this.content.scrollToBottom(300);
  }

  onClickBack() {
    this.navCtrl.navigateBack('/chat-list');
  }

  sendMsg() {
    this.chatService.addMessageList(this.msgToSend, this.paramId);
    this.loadedMessage = this.chatService.getChatListById(Number(this.paramId));
    this.msgToSend = '';
    setTimeout(() => {
      this.content.scrollToBottom(300);
    });
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
