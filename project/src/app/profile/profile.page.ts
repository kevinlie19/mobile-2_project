import {Component, OnInit} from '@angular/core';
import {Profile} from './profile.model';
import {ProfileService} from './profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  loadedAvailable: Profile[];
  loadedUnavailable: Profile[];

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit() {
    this.loadedAvailable = this.profileService.itemAvailableList;
    this.loadedUnavailable = this.profileService.itemUnvailableList;
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
