import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Storage} from '@ionic/storage';

import {Search} from './search.model';
import {APISetting} from '../constant/API';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  constructor(private router: Router, private storage: Storage) {}

  loadedSearch: Search[];
  isInputEntered: boolean;
  isLoading: boolean;

  async ngOnInit() {
    this.isInputEntered = false;
    this.isLoading = true;
    let userToken = await this.storage.get('userToken');
    let response = await fetch(
      APISetting.API_ENDPOINT + 'feature/search/?query=',
      {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: userToken,
        },
      },
    );

    const result = await response.json();
    this.loadedSearch = result.data;
    this.isLoading = false;
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  async onInputSearch(keyword: string) {
    this.isLoading = true;
    let userToken = await this.storage.get('userToken');
    let response = await fetch(
      APISetting.API_ENDPOINT + 'feature/search/?query=' + keyword,
      {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: userToken,
        },
      },
    );

    const result = await response.json();
    this.loadedSearch = result.data;
    this.isLoading = false;
    if (keyword === '') {
      this.isInputEntered = false;
    } else {
      this.isInputEntered = true;
    }
  }

  onClickAdd() {
    this.router.navigateByUrl('/add-item');
  }

  onClickRequest() {
    this.router.navigateByUrl('/request');
  }

  onClickProfile() {
    this.router.navigateByUrl('/profile');
  }

  onClickHome() {
    this.router.navigateByUrl('/feeds');
  }
}
