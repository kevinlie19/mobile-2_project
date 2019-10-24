import { Component, OnInit } from '@angular/core';
import { Requests } from './request.model';
import { RequestService } from './request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  loadedRequests: Requests[];
  loadedMyRequests: Requests[];
  segment: string = 'requests';

  constructor(
    private requestService: RequestService
  ) { }

  ngOnInit() {
    this.loadedRequests = this.requestService.allRequest;
    this.loadedMyRequests = this.requestService.allMyRequest;
  }

}
