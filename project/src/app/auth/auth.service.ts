import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: variable-name
  private _userIsAuthenticated = false;
  // tslint:disable-next-line: variable-name
  private _userInfo = {
    email: '',
    username: '',
    password: '',
  };

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  setUserInfo(
    email: string,
    username: string,
    password: string,
  ) {
    this._userInfo = {
      email,
      username,
      password
    };
  }

  getUserInfo() {
    return this._userInfo;
  }

  resetUserInfo() {
    this._userInfo.email = '';
    this._userInfo.username = '';
    this._userInfo.password = '';
  }

  login() {
    this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
  }

  constructor() {}
}
