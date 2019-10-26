import {Injectable} from '@angular/core';
import {Profile} from './profile-user.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileUserService {
  private _itemAvailable: Profile[] = [
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
      id: 'p4',
      item_name: 'Lasagna',
      status: 'Available',
      category: 'Meat',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      buyDate: '10 September 2019',
      expDate: '1 November 2019',
      timestamps: '3',
      itemImageUrl:
        'https://dinnerthendessert.com/wp-content/uploads/2016/04/Ultimate-Meat-Lasagna-3-1.jpg',
      username: 'John Doe',
      location: 'Jakarta Pusat',
      avatar:
        'http://preview.premium-contao-themes.com/cords/demo/files/cto_layout/img/placeholder/team_1.jpg',
    },
  ];

  private _itemUnavailable: Profile[] = [
    {
      id: 'p5',
      item_name: 'Chocolate Lava',
      status: 'Unavailable',
      category: 'Dessert',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      buyDate: '10 September 2019',
      expDate: '1 November 2019',
      timestamps: '8',
      itemImageUrl:
        'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2018/09/dessert-main-image-molten-cake.jpg',
      username: 'John Doe',
      location: 'Jakarta Pusat',
      avatar:
        'http://preview.premium-contao-themes.com/cords/demo/files/cto_layout/img/placeholder/team_1.jpg',
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
