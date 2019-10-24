import {Injectable} from '@angular/core';
import {Feeds} from './feeds.model';

@Injectable({
  providedIn: 'root',
})
export class FeedsService {
  private _feeds: Feeds[] = [
    {
      id: 'p1',
      item_name: 'Chocolate Brownie',
      status: 'Available',
      category: 'Dessert',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      buyDate: '10 September 2019',
      expDate: '1 November 2019',
      timestamps: '1',
      itemImageUrl:
        'https://www.chelsea.co.nz/files/cache/c7eb8909bcbfb9ff878c499feb1dcbd5_f1433.jpg',
      username: 'Cecilia K.',
      location: 'Jakarta Selatan',
      avatar: 'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg',
    },
    {
      id: 'p2',
      item_name: 'Golden Potatoes',
      status: 'Available',
      category: 'Dessert',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      buyDate: '10 September 2019',
      expDate: '1 November 2019',
      timestamps: '2',
      itemImageUrl:
        'https://www.foxandbriar.com/wp-content/uploads/2016/03/Rosemary-Garlic-Potatoes-4-of-4.jpg',
      username: 'Cecilia K.',
      location: 'Jakarta Selatan',
      avatar: 'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg',
    },
    {
      id: 'p3',
      item_name: 'Fish',
      status: 'Unavailable',
      category: 'Meat',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      buyDate: '10 September 2019',
      expDate: '1 November 2019',
      timestamps: '2',
      itemImageUrl:
        'https://indianapublicmedia.org/amomentofscience/files/2019/08/damsel-fish.jpg',
      username: 'Cecilia K.',
      location: 'Jakarta Selatan',
      avatar: 'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg',
    },
  ];

  get allFeeds() {
    return [...this._feeds];
  }

  getFeedById(id: string) {
    return {...this._feeds.find((feed) => feed.id === id)};
  }

  constructor() {}
}
