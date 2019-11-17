import {Injectable} from '@angular/core';
import {EmptyChat} from '../chat-list.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  emptyChat: EmptyChat = {
    id: 0,
    full_name: '',
    avatar: '',
  };

  constructor() {}

  addEmptyChat(id: number, full_name: string, avatar: string) {
    this.emptyChat.id = id;
    this.emptyChat.full_name = full_name;
    this.emptyChat.avatar = avatar;
  }

  getEmptyChat() {
    return this.emptyChat;
  }
}
