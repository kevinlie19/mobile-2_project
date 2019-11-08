import {Injectable} from '@angular/core';

import {Profile} from './profile.model';
import {timestampFormat} from '../helpers/timestampFormat';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  _myProfile: Profile;

  addProfile(result: Profile) {
    for (let key of result.post) {
      key.timestamp = timestampFormat(key.timestamp);
    }
    this._myProfile = result;
  }

  getProfile() {
    return this._myProfile;
  }

  constructor() {}
}
