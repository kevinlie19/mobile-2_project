import {Component, OnInit} from '@angular/core';
import {Request, myRequests} from './request.model';
import {RequestService} from './request.service';
import {Router} from '@angular/router';

import {Storage} from '@ionic/storage';

import {APISetting} from '../constant/API';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
  isLoading: boolean;
  loadedRequests: Request[];
  loadedMyRequests: myRequests[];
  isRequestEmpty: boolean;
  isMyRequestEmpty: boolean;
  segment: string = 'requests';

  constructor(
    private router: Router,
    private storage: Storage,
    private alertCtrl: AlertController,
    private toastController: ToastController,
  ) {}

  ionViewWillEnter() {
    this.ngOnInit();
  }

  async ngOnInit() {
    this.isLoading = true;
    this.segment = 'requests';
    this.isRequestEmpty = false;
    this.isMyRequestEmpty = false;
    let userToken = await this.storage.get('userToken');

    let response = await fetch(APISetting.API_ENDPOINT + 'page/user-request', {
      method: 'GET',
      headers: {
        authorization: userToken,
      },
    });
    let request;
    if (response.status === 200) {
      request = await response.json();
    } else {
      console.log(response);
    }

    if (request.success === true) {
      console.log(this.loadedRequests);
      this.loadedRequests = request.data;
      if (this.loadedRequests.length === 0) {
        this.isRequestEmpty = true;
      } else {
        this.isRequestEmpty = false;
      }
    } else {
      let alert = await this.alertCtrl.create({
        message: request.message,
        buttons: [
          {
            text: 'OK',
            handler: () => {},
          },
        ],
      });
      await alert.present();
      return;
    }

    response = await fetch(APISetting.API_ENDPOINT + 'page/my-request', {
      method: 'GET',
      headers: {
        authorization: userToken,
      },
    });
    let myRequest;
    if (response.status === 200) {
      myRequest = await response.json();
    } else {
      console.log(response);
    }

    if (myRequest.success === true) {
      console.log(this.loadedMyRequests);
      this.loadedMyRequests = myRequest.data;
      if (this.loadedMyRequests.length === 0) {
        this.isMyRequestEmpty = true;
      } else {
        this.isMyRequestEmpty = false;
      }
    } else {
      let alert = await this.alertCtrl.create({
        message: myRequest.message,
        buttons: [
          {
            text: 'OK',
            handler: () => {},
          },
        ],
      });
      await alert.present();
      return;
    }
    this.isLoading = false;
  }

  onClickHome() {
    this.router.navigateByUrl('/feeds');
  }

  onClickSearch() {
    this.router.navigateByUrl('/search');
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

  async doRefresh(event) {
    this.isRequestEmpty = false;
    this.isMyRequestEmpty = false;
    let userToken = await this.storage.get('userToken');

    let response = await fetch(APISetting.API_ENDPOINT + 'page/user-request', {
      method: 'GET',
      headers: {
        authorization: userToken,
      },
    });
    let request;
    if (response.status === 200) {
      request = await response.json();
    } else {
      console.log(response);
    }

    if (request.success === true) {
      console.log(this.loadedRequests);
      this.loadedRequests = request.data;
      if (this.loadedRequests.length === 0) {
        this.isRequestEmpty = true;
      } else {
        this.isRequestEmpty = false;
      }
    } else {
      let alert = await this.alertCtrl.create({
        message: request.message,
        buttons: [
          {
            text: 'OK',
            handler: () => {},
          },
        ],
      });
      await alert.present();
      return;
    }

    response = await fetch(APISetting.API_ENDPOINT + 'page/my-request', {
      method: 'GET',
      headers: {
        authorization: userToken,
      },
    });
    let myRequest;
    if (response.status === 200) {
      myRequest = await response.json();
    } else {
      console.log(response);
    }

    if (myRequest.success === true) {
      console.log(this.loadedMyRequests);
      this.loadedMyRequests = myRequest.data;
      if (this.loadedMyRequests.length === 0) {
        this.isMyRequestEmpty = true;
      } else {
        this.isMyRequestEmpty = false;
      }
      event.target.complete();
    } else {
      event.target.complete();
      let alert = await this.alertCtrl.create({
        message: myRequest.message,
        buttons: [
          {
            text: 'OK',
            handler: () => {},
          },
        ],
      });
      await alert.present();
      return;
    }
  }

  async accept(data) {
    let userToken = await this.storage.get('userToken');

    const body = {
      status: 'Approved',
      post_id: data.post_id,
      requester_id: data.user_id,
    };

    const response = await fetch(
      APISetting.API_ENDPOINT + 'feature/answer-request',
      {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json', authorization: userToken},
      },
    );

    let request;
    if (response.status === 200) {
      request = await response.json();
    } else {
      console.log(response);
    }

    if (request.success === true) {
      const toast = await this.toastController.create({
        message: 'Your have been approved the request!',
        duration: 2000,
      });
      toast.present();

      this.doRefresh(event);
    } else {
      return;
    }
  }

  async decline(data) {
    let userToken = await this.storage.get('userToken');

    const body = {
      status: 'Declined',
      post_id: data.post_id,
      requester_id: data.user_id,
    };

    const response = await fetch(
      APISetting.API_ENDPOINT + 'feature/answer-request',
      {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json', authorization: userToken},
      },
    );

    let request;
    if (response.status === 200) {
      request = await response.json();
    } else {
      console.log(response);
    }

    if (request.success === true) {
      const toast = await this.toastController.create({
        message: 'Your have been declined the request!',
        duration: 2000,
      });
      toast.present();

      this.doRefresh(event);
    } else {
    }
  }

  chatNow(id: number) {
    this.router.navigateByUrl('/chat/' + id);
  }
}
