import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  onClickClose() {
    this.navCtrl.setDirection('back');
  }

  onClickAvatar() {}
}
