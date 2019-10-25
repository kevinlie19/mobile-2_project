import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-feeds-add-post',
  templateUrl: './feeds-add-post.page.html',
  styleUrls: ['./feeds-add-post.page.scss'],
})
export class FeedsAddPostPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  onClickClose() {
    this.navCtrl.setDirection('back');
  }
}
