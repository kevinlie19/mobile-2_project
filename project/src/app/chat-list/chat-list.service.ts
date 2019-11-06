import {Injectable} from '@angular/core';

import {Chat} from './chat-list.model';

@Injectable({
  providedIn: 'root',
})
export class ChatListService {
  chatList: Chat[] = [
    {
      id: 1,
      user_id: 1,
      username: 'johndoe',
      full_name: 'John Doe',
      avatar:
        'http://swipemarket.com/wp-content/uploads/2014/06/Untitled-6.jpg',
      time: '16.00',
      last_chat: 'Mantab sis, saya siap ketemuan nanti siang jam 11 di UMN',
      messages: [
        {
          messageId: 1,
          userId: 1,
          userName: 'John Doe',
          userAvatar:
            'http://swipemarket.com/wp-content/uploads/2014/06/Untitled-6.jpg',
          toUserId: 2,
          time: '13.30',
          message:
            'Halo, saya mau request browniesnya. Kira-kira bisa ketemuan kapan ya, sis?',
        },
        {
          messageId: 2,
          userId: 2,
          userName: 'Cecillia K',
          userAvatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRLkdT_G-1j8z4t_d14D8WDtRCbSQ7RsGv-_WgTzN5XEIA4eig7',
          toUserId: 1,
          time: '14.00',
          message: 'Oke, bisa ketemu saya nanti siang jam 12 di UMN?',
        },
        {
          messageId: 3,
          userId: 1,
          userName: 'John Doe',
          userAvatar:
            'http://swipemarket.com/wp-content/uploads/2014/06/Untitled-6.jpg',
          toUserId: 2,
          time: '14.15',
          message: 'Bisa, sis! Saya kosong jam segitu',
        },
      ],
    },
    {
      id: 2,
      user_id: 2,
      username: 'johnwick',
      full_name: 'John Wick',
      avatar:
        'http://swipemarket.com/wp-content/uploads/2014/06/Untitled-6.jpg',
      time: '12.00',
      last_chat: 'Siap, terima kasih !',
      messages: [
        {
          messageId: 1,
          userId: 1,
          userName: 'John Doe',
          userAvatar:
            'http://swipemarket.com/wp-content/uploads/2014/06/Untitled-6.jpg',
          toUserId: 2,
          time: '13.30',
          message:
            'Halo, saya mau request browniesnya. Kira-kira bisa ketemuan kapan ya, sis?',
        },
        {
          messageId: 2,
          userId: 2,
          userName: 'Cecillia K',
          userAvatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRLkdT_G-1j8z4t_d14D8WDtRCbSQ7RsGv-_WgTzN5XEIA4eig7',
          toUserId: 1,
          time: '14.00',
          message: 'Oke, bisa ketemu saya nanti siang jam 12 di UMN?',
        },
        {
          messageId: 3,
          userId: 1,
          userName: 'John Doe',
          userAvatar:
            'http://swipemarket.com/wp-content/uploads/2014/06/Untitled-6.jpg',
          toUserId: 2,
          time: '14.15',
          message: 'Bisa, sis! Saya kosong jam segitu',
        },
      ],
    },
    {
      id: 3,
      user_id: 3,
      username: 'tranquilo',
      full_name: 'Bill T',
      avatar:
        'http://swipemarket.com/wp-content/uploads/2014/06/Untitled-6.jpg',
      time: '11.00',
      last_chat: 'Saya tertarik nih mau ambil brownies nya!',
      messages: [
        {
          messageId: 1,
          userId: 1,
          userName: 'John Doe',
          userAvatar:
            'http://swipemarket.com/wp-content/uploads/2014/06/Untitled-6.jpg',
          toUserId: 2,
          time: '13.30',
          message:
            'Halo, saya mau request browniesnya. Kira-kira bisa ketemuan kapan ya, sis?',
        },
        {
          messageId: 2,
          userId: 2,
          userName: 'Cecillia K',
          userAvatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRLkdT_G-1j8z4t_d14D8WDtRCbSQ7RsGv-_WgTzN5XEIA4eig7',
          toUserId: 1,
          time: '14.00',
          message: 'Oke, bisa ketemu saya nanti siang jam 12 di UMN?',
        },
        {
          messageId: 3,
          userId: 1,
          userName: 'John Doe',
          userAvatar:
            'http://swipemarket.com/wp-content/uploads/2014/06/Untitled-6.jpg',
          toUserId: 2,
          time: '14.15',
          message: 'Bisa, sis! Saya kosong jam segitu',
        },
      ],
    },
  ];

  constructor() {}

  getChatListById(id: number) {
    return {...this.chatList.find((p) => p.id === id)};
  }

  getChatList() {
    return this.chatList;
  }

  addMessageList(msg: string, id: number) {
    for (let i in this.chatList) {
      if (this.chatList[i].id === id) {
        this.chatList[i].messages.push({
          messageId: 4,
          userId: 2,
          userName: 'Cecillia K',
          userAvatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRLkdT_G-1j8z4t_d14D8WDtRCbSQ7RsGv-_WgTzN5XEIA4eig7',
          toUserId: 1,
          time: '15.00',
          message: msg,
        });
        break;
      }
    }
  }
}
