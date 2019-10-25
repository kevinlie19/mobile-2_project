import {Injectable} from '@angular/core';
import {Profile} from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private _itemAvailable: Profile[] = [
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
  ];

  private _itemUnavailable: Profile[] = [
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
        'https://img.etimg.com/thumb/msid-68495044,width-643,imgsize-1335371,resizemode-4/fish.jpg',
      username: 'Cecilia K.',
      location: 'Jakarta Selatan',
      avatar: 'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg',
    },
  ];

  get itemAvailableList() {
    return [...this._itemAvailable];
  }

  getItemAvailable(id: string) {
    return {...this._itemAvailable.find((p) => p.id === id)};
  }

  get itemUnvailableList() {
    return [...this._itemUnavailable];
  }

  getItemUnavailable(id: string) {
    return {...this._itemUnavailable.find((p) => p.id === id)};
  }

  constructor() {}
}
