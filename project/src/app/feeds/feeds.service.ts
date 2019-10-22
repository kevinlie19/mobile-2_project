import { Injectable } from '@angular/core';
import { Feeds } from './feeds.model';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  private _item: Feeds[] = [
    new Feeds(
      'p1',
      'Chocolate Brownie',
      'Available',
      '1',
      'Cecilia K.',
      'Jakarta Selatan',
      'https://www.chelsea.co.nz/files/cache/c7eb8909bcbfb9ff878c499feb1dcbd5_f1433.jpg',
      'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg'
    ),
    new Feeds(
      'p2',
      'Golden Potatoes',
      'Available',
      '2',
      'Cecilia K.',
      'Jakarta Selatan',
      'https://www.foxandbriar.com/wp-content/uploads/2016/03/Rosemary-Garlic-Potatoes-4-of-4.jpg',
      'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg'
    ),
    new Feeds(
      'z1',
      'Fish',
      'Unavailable',
      '1',
      'Cecilia K.',
      'Jakarta Selatan',
      'https://indianapublicmedia.org/amomentofscience/files/2019/08/damsel-fish.jpg',
      'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg'
    )
  ];

  get itemList() {
    return [...this._item];
  }

  getItem(id: string) {
    return {...this._item.find((p) => p.id === id)};
  }

  constructor() { }
}
