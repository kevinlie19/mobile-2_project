import {Injectable} from '@angular/core';
import {Feeds} from './feeds.model';
import {timestampFormat} from '../helpers/timestampFormat';

@Injectable({
  providedIn: 'root',
})
export class FeedsService {
  private _feeds: Feeds[];

  addFeeds(result: Feeds[]) {
    for (let key of result) {
      key.timestamp = timestampFormat(key.timestamp);
    }
    this._feeds = result;
  }

  getFeeds() {
    return this._feeds;
  }

  getFeedById(id: number) {
    return {...this._feeds.find((feed) => feed.id === id)};
  }

  constructor() {}
}
