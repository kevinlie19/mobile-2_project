import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SetUpProfilePage } from './set-up-profile.page';

const routes: Routes = [
  {
    path: '',
    component: SetUpProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SetUpProfilePage]
})
export class SetUpProfilePageModule {}
