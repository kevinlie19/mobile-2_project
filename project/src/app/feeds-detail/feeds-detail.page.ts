import {Component, OnInit} from '@angular/core';
import {FeedsService} from '../feeds/feeds.service';
import {Feeds} from '../feeds/feeds.model';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-feeds-detail',
  templateUrl: './feeds-detail.page.html',
  styleUrls: ['./feeds-detail.page.scss'],
})
export class FeedsDetailPage implements OnInit {
  _feed: Feeds;

  constructor(
    private feedsService: FeedsService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('feedsId')) {
        this.navCtrl.navigateBack('/feeds');
        return;
      }
      this._feed = this.feedsService.getFeedById(paramMap.get('feedsId'));
    });
  }
}
