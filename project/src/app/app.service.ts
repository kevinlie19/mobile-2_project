import {Feeds} from './feeds/feeds.model';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _tokenNotif: string;
  private _scanBarcodeFeeds: Feeds = {
    id: 0,
    user_id: 0,
    item_name: '',
    tag: 'Available',
    category: '',
    description: '',
    buy_date: '',
    exp_date: '',
    timestamp: '',
    image: '',
    full_name: '',
    username: '',
    location: '',
    avatar: '',
  };

  getAllScanBarcodeFeeds() {
    return this._scanBarcodeFeeds;
  }

  setScanBarcodeFeeds(scanBarcodeFeeds: Feeds) {
    this._scanBarcodeFeeds = scanBarcodeFeeds;
  }

  resetScanBarcodeFeeds() {
    this._scanBarcodeFeeds = {
      id: 0,
      user_id: 0,
      item_name: '',
      tag: 'Available',
      category: '',
      description: '',
      buy_date: '',
      exp_date: '',
      timestamp: '',
      image: '',
      full_name: '',
      username: '',
      location: '',
      avatar: '',
    };
  }

  getTokenNotif() {
    return this._tokenNotif;
  }

  setTokenNotif(tokenNotif) {
    this._tokenNotif = tokenNotif;
  }
  constructor() {}
}
