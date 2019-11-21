import {AppService} from './../app.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-token-notification',
  templateUrl: './token-notification.page.html',
  styleUrls: ['./token-notification.page.scss'],
})
export class TokenNotificationPage implements OnInit {
  constructor(private appService: AppService) {}

  ngOnInit() {
    const token = this.appService.getTokenNotif();
    alert('tokennya : ' + token);
  }
}
