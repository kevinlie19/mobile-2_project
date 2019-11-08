import {Injectable} from '@angular/core';
import {FeedDetails} from './feeds-detail.model';

@Injectable({
  providedIn: 'root',
})
export class FeedsDetailService {
  selectedFeed: FeedDetails;

  addFeed(result: FeedDetails) {
    this.selectedFeed = result;
  }

  getFeed() {
    return this.selectedFeed;
  }

  constructor() {}
}
