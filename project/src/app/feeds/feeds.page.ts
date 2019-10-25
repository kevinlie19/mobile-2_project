import {Component, OnInit} from '@angular/core';
import {Feeds} from './feeds.model';
import {FeedsService} from './feeds.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.page.html',
  styleUrls: ['./feeds.page.scss'],
})
export class FeedsPage implements OnInit {
  loadedFeeds: Feeds[];

  constructor(private feedsService: FeedsService, private router: Router) {}

  ngOnInit() {
    this.loadedFeeds = this.feedsService.allFeeds;
  }

  onClickAdd() {
    this.router.navigateByUrl('/feeds-add-post');
  }

  onClickRequest() {
    this.router.navigateByUrl('/request');
  }

  onClickProfile() {
    this.router.navigateByUrl('/profile');
  }
}
