import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ProfileUserPage} from './profile-user.page';
import {ViewFollowingComponent} from './view-following/view-following.component';
import {ViewFollowerComponent} from './view-follower/view-follower.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileUserPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ProfileUserPage,
    ViewFollowingComponent,
    ViewFollowerComponent,
  ],
  entryComponents: [ViewFollowingComponent, ViewFollowerComponent],
})
export class ProfileUserPageModule {}
