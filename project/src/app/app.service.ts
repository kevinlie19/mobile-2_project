import { Feeds } from './feeds/feeds.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _scanBarcodeFeeds: Feeds = {
    id: '',
    item_name: '',
    status: '',
    category: '',
    description: '',
    buyDate: '',
    expDate: '',
    timestamps: '',
    itemImageUrl: '',
    username: '',
    location: '',
    avatar: '',
  };

  getAllScanBarcodeFeeds() {
    return this._scanBarcodeFeeds;
  }

  setScanBarcodeFeeds(scanBarcodeFeeds: Feeds){
    this._scanBarcodeFeeds = scanBarcodeFeeds;
  }

  resetScanBarcodeFeeds(){
    this._scanBarcodeFeeds = {
      id: '',
      item_name: '',
      status: '',
      category: '',
      description: '',
      buyDate: '',
      expDate: '',
      timestamps: '',
      itemImageUrl: '',
      username: '',
      location: '',
      avatar: '',
    };
  }

  constructor() { }
}
