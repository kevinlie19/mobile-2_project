import {Component, OnInit} from '@angular/core';
import {Requests} from './request.model';
import {RequestService} from './request.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
  loadedRequests: Requests[];
  loadedMyRequests: Requests[];
  segment: string = 'requests';

  constructor(private requestService: RequestService, private router: Router) {}

  ngOnInit() {
    this.loadedRequests = this.requestService.allRequest;
    this.loadedMyRequests = this.requestService.allMyRequest;
  }

  onClickHome() {
    this.router.navigateByUrl('/feeds');
  }

  onClickAdd() {
    this.router.navigateByUrl('/add-item');
  }

  onClickProfile() {
    this.router.navigateByUrl('/profile');
  }

  onClickRequest() {
    this.router.navigateByUrl('/request');
  }
}
