import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ChatListPage} from './chat-list.page';
import {ChooseFriendComponent} from './choose-friend/choose-friend.component';

const routes: Routes = [
  {
    path: '',
    component: ChatListPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ChatListPage, ChooseFriendComponent],
  entryComponents: [ChooseFriendComponent],
})
export class ChatListPageModule {}
