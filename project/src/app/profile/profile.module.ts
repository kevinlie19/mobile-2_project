import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ProfilePage} from './profile.page';
import { ViewFollowerComponent } from './view-follower/view-follower.component';
import { ViewFollowingComponent } from './view-following/view-following.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProfilePage, ViewFollowerComponent, ViewFollowingComponent],
  entryComponents: [ViewFollowerComponent, ViewFollowingComponent],
})
export class ProfilePageModule {}
