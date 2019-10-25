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
      itemImageUrl: '../../../assets/images/Chocolate Brownie.png',
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
      username: 'John Doe',
      location: 'Jakarta Pusat',
      avatar:
        'http://preview.premium-contao-themes.com/cords/demo/files/cto_layout/img/placeholder/team_1.jpg',
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
      timestamps: '5',
      itemImageUrl:
        'https://img.etimg.com/thumb/msid-68495044,width-643,imgsize-1335371,resizemode-4/fish.jpg',
      username: 'Bill Tranquilo',
      location: 'Tangerang',
      avatar:
        'http://www.analyticalones.com/wp-content/uploads/2013/03/Bill-avatar.jpg',
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
