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

  getSelectedFeed(id: number) {
    for (let i in this.selectedFeed.post) {
      if (this.selectedFeed.post[i].id === id) {
        return this.selectedFeed.post[i];
      }
    }
  }

  constructor() {}
}
