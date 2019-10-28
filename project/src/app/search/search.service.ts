import {Injectable} from '@angular/core';
import {Search} from './search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _users: Search[] = [
    {
      id: 'p1',
      username: '@ceciliak',
      avatar: 'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg',
      flagFollow: 1,
    },
    {
      id: 'p2',
      username: '@johnnydoe',
      avatar:
        'http://preview.premium-contao-themes.com/cords/demo/files/cto_layout/img/placeholder/team_1.jpg',
      flagFollow: 3,
    },
    {
      id: 'p3',
      username: '@billtranquilo',
      avatar:
        'http://www.analyticalones.com/wp-content/uploads/2013/03/Bill-avatar.jpg',
      flagFollow: 1,
    },
  ];

  get allUsers() {
    return [...this._users];
  }

  getUserById(id: string) {
    return {...this._users.find((user) => user.id === id)};
  }

  setFollow(id: string) {
    const userIndex = this._users.findIndex((user) => user.id === id);
    this._users[userIndex].flagFollow = 2;
  }

  setUnfollow(id: string) {
    const userIndex = this._users.findIndex((user) => user.id === id);
    this._users[userIndex].flagFollow = 1;
  }

  constructor() {}
}
