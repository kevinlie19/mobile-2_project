import {Injectable} from '@angular/core';
import {Profile} from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  myProfile: Profile;

  // get itemAvailableList() {
  //   return [...this._itemAvailable];
  // }

  // getItemAvailable(id: string) {
  //   return {...this._itemAvailable.find((p) => p.id === id)};
  // }

  // get itemUnvailableList() {
  //   return [...this._itemUnavailable];
  // }

  // getItemUnavailable(id: string) {
  //   return {...this._itemUnavailable.find((p) => p.id === id)};
  // }

  addProfile(result: Profile) {
    this.myProfile = result;
    console.log('SERVICE=>', this.myProfile);
  }

  getProfile() {
    return this.myProfile;
  }

  constructor() {}
}
