import {Component, OnInit} from '@angular/core';
import {Profile} from './profile-user.model';
import {ProfileUserService} from './profile-user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.page.html',
  styleUrls: ['./profile-user.page.scss'],
})
export class ProfileUserPage implements OnInit {
  loadedAvailable: Profile[];
  loadedUnavailable: Profile[];
  isFollowed: boolean;

  constructor(
    private profileUserService: ProfileUserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadedAvailable = this.profileUserService.itemAvailableList;
    this.loadedUnavailable = this.profileUserService.itemUnvailableList;
    this.isFollowed = false;
  }

  onClickHome() {
    this.router.navigateByUrl('/feeds');
  }

  onClickAdd() {
    this.router.navigateByUrl('/feeds-add-post');
  }

  onClickRequest() {
    this.router.navigateByUrl('/request');
  }

  onClickFollow() {
    this.isFollowed = true;
  }

  onClickUnfollow() {
    this.isFollowed = false;
  }
}
