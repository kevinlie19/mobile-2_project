import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeedsAddPostPage } from './feeds-add-post.page';

const routes: Routes = [
  {
    path: '',
    component: FeedsAddPostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FeedsAddPostPage]
})
export class FeedsAddPostPageModule {}
