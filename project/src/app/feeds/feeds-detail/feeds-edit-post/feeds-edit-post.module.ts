<<<<<<< HEAD
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {FeedsEditPostPage} from './feeds-edit-post.page';
=======
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeedsEditPostPage } from './feeds-edit-post.page';
>>>>>>> wip-feeds

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD
    component: FeedsEditPostPage,
  },
=======
    component: FeedsEditPostPage
  }
>>>>>>> wip-feeds
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< HEAD
    RouterModule.forChild(routes),
  ],
  declarations: [FeedsEditPostPage],
=======
    RouterModule.forChild(routes)
  ],
  declarations: [FeedsEditPostPage]
>>>>>>> wip-feeds
})
export class FeedsEditPostPageModule {}
