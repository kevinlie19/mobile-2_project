import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SearchService} from './search.service';
import {Search} from './search.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  constructor(private searchService: SearchService, private router: Router) {}

  loadedSearch: Search[];
  filteredSearch: Search[];
  searchKeyword: string;

  ngOnInit() {
    this.loadedSearch = this.searchService.allUsers;
  }

  filterUsers() {
    if (this.searchKeyword === undefined) {
      return;
    } else {
      this.filteredSearch = this.loadedSearch.filter(
        (item) =>
          item.username
            .toLowerCase()
            .indexOf(this.searchKeyword.toLowerCase()) > -1,
      );
    }
  }

  onClickFollow(id: string) {
    this.searchService.setFollow(id);
  }

  onClickUnfollow(id: string) {
    this.searchService.setUnfollow(id);
  }

  onClickAdd() {
    this.router.navigateByUrl('/feeds-add-post');
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
