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

  ngOnInit() {
    this.isInputEntered = false;
  }

  async onInputSearch(keyword: string) {
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
    this.isInputEntered = true;
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
