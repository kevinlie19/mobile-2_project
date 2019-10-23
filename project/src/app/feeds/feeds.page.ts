import { Component, OnInit } from '@angular/core';
import { Feeds } from './feeds.model';
import { FeedsService } from './feeds.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.page.html',
  styleUrls: ['./feeds.page.scss'],
})
export class FeedsPage implements OnInit {
  loadedItem: Feeds[];

  constructor(private feedsService: FeedsService) { }

  ngOnInit() {
    this.loadedItem = this.feedsService.itemList;
  }

}
