import {Injectable} from '@angular/core';
import {UserProfile} from './profile-user.model';
import {timestampFormat} from '../helpers/timestampFormat';

@Injectable({
  providedIn: 'root',
})
export class ProfileUserService {
  _userProfile: UserProfile;

  addUserProfile(result: UserProfile) {
    for (let key of result.post) {
      key.timestamp = timestampFormat(key.timestamp);
    }
    this._userProfile = result;
  }

  getUserProfile() {
    return this._userProfile;
  }

  getUserId() {
    return this._userProfile.user[0].id;
  }

  constructor() {}
}
