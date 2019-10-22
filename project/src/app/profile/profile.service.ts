import { Injectable } from '@angular/core';
import { Profile } from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _itemAvailable: Profile[] = [
    new Profile(
      'p1',
      'Chocolate Brownie',
      'Available',
      '1',
      'Cecilia K.',
      'Jakarta Selatan',
      'https://www.chelsea.co.nz/files/cache/c7eb8909bcbfb9ff878c499feb1dcbd5_f1433.jpg',
      'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg'
    ),
    new Profile(
      'p2',
      'Golden Potatoes',
      'Available',
      '2',
      'Cecilia K.',
      'Jakarta Selatan',
      'https://www.foxandbriar.com/wp-content/uploads/2016/03/Rosemary-Garlic-Potatoes-4-of-4.jpg',
      'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg'
    ),
    // new Profile(
    //   'p2',
    //   'Golden Potatoes',
    //   'Available',
    //   '2',
    //   'Cecilia K.',
    //   'Jakarta Selatan',
    //   'https://www.foxandbriar.com/wp-content/uploads/2016/03/Rosemary-Garlic-Potatoes-4-of-4.jpg',
    //   'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg'
    // ),
  ];

  private _itemUnavailable: Profile[] = [
    new Profile(
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

  constructor() { }
}
