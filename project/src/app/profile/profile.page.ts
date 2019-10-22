import { Component, OnInit } from '@angular/core';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  loadedAvailable: Profile[];
  loadedUnavailable: Profile[];

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.loadedAvailable = this.profileService.itemAvailableList;
    this.loadedUnavailable = this.profileService.itemUnvailableList;
  }

}
