import {Injectable} from '@angular/core';
import {Profile} from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  myProfile: Profile;

  addProfile(result: Profile) {
    this.myProfile = result;
  }

  getProfile() {
    return this.myProfile;
  }

  constructor() {}
}
