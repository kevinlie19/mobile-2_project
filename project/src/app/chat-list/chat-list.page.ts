import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {NavController} from '@ionic/angular';

import {Chat} from './chat-list.model';
import {ChatListService} from './chat-list.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {
  loadedChatList: Chat[];

  constructor(
    private router: Router,
    private chatListService: ChatListService,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.loadedChatList = this.chatListService.getChatList();
  }

  onClickChatList() {
    this.router.navigateByUrl('/chat-list/chat');
  }

  onClickBack() {
    this.navCtrl.navigateBack('/feeds');
  }
}
