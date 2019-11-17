import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {
  BarcodeScannerOptions,
  BarcodeScanner,
} from '@ionic-native/barcode-scanner/ngx';

import {Feeds} from './feeds.model';
import {FeedsService} from './feeds.service';
import {AppService} from '../app.service';
import {Storage} from '@ionic/storage';
import {
  LoadingController,
  AlertController,
  NavController,
} from '@ionic/angular';

import {APISetting} from '../constant/API';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.page.html',
  styleUrls: ['./feeds.page.scss'],
})
export class FeedsPage implements OnInit {
  isLoading: boolean;
  isEmpty: boolean;
  loadedFeeds: Feeds[];
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  loginStatus: boolean = false;

  constructor(
    private feedsService: FeedsService,
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    private appService: AppService,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
  ) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true,
    };
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  async ngOnInit() {
    this.isLoading = true;
    this.isEmpty = false;
    const self = this;
    let userToken = await this.storage.get('userToken');

    let response = await fetch(APISetting.API_ENDPOINT + 'page/home', {
      method: 'GET',
      headers: {
        authorization: userToken,
      },
    });

    let post;
    if (response.status === 200) {
      post = await response.json();
    } else {
      console.log(response);
    }

    if (post.success === true) {
      self.feedsService.addFeeds(post.data);
      self.loadedFeeds = self.feedsService.getFeeds();
      if (self.loadedFeeds.length === 0) {
        self.isEmpty = true;
      } else {
        self.isEmpty = false;
      }
    } else {
      let alert = await this.alertCtrl.create({
        message: post.message,
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

  onClickChat() {
    this.router.navigateByUrl('/chat-list');
  }

  onClickAdd() {
    this.router.navigateByUrl('/add-item');
  }

  onClickRequest() {
    this.router.navigateByUrl('/request');
  }

  onClickSearch() {
    this.router.navigateByUrl('/search');
  }

  onClickProfile() {
    this.router.navigateByUrl('/profile');
  }

  onClickHome() {
    this.router.navigateByUrl('/feeds');
  }

  scanBarcode() {
    const self = this;
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.scannedData = barcodeData;

        if (barcodeData.text === '8991389232033') {
          alert(
            'Barcode number ' +
              JSON.stringify(barcodeData.text) +
              '\nYou scanned a Sari Roti!',
          );
          this.appService.setScanBarcodeFeeds({
            id: 50,
            user_id: 50,
            item_name: 'Sari Roti',
            tag: 'Available',
            category: 'Dairy Foods"',
            description:
              'Describe your item here',
            buy_date: '11/17/2019',
            exp_date: '11/30/2019',
            timestamp: '1',
            // tslint:disable-next-line: max-line-length
            image:
              'https://www.rotinyaindonesia.com/contents/sari-roti-p40cyI20181009132656.png',
            username: 'ceciliak',
            full_name: 'Cecilia K.',
            location: 'Jakarta Selatan',
            avatar: 'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg',
          });
          self.router.navigateByUrl('/feeds-add-post');
        } else if (barcodeData.text === '8996001600268') {
          alert(
            'Barcode number ' +
              JSON.stringify(barcodeData.text) +
              '\nYou scanned a Bear Brand!',
          );
          this.appService.setScanBarcodeFeeds({
            id: 51,
            user_id: 50,
            item_name: 'Susu Bear Brand',
            tag: 'Available',
            category: 'Milk',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            buy_date: '11/17/2019',
            exp_date: '11/31/2019',
            timestamp: '1',
            // tslint:disable-next-line: max-line-length
            image:
              // tslint:disable-next-line: max-line-length
              'https://ecs7.tokopedia.net/img/cache/700/product-1/2017/10/24/803115/803115_1bff2b5d-59af-4506-bcba-f027e09275cc_1250_1664.jpg',
            username: 'ceciliak',
            full_name: 'Cecilia K.',
            location: 'Jakarta Selatan',
            avatar: 'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg',
          });
          self.router.navigateByUrl('/feeds-add-post');
        }
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  async doRefresh(event) {
    let userToken = await this.storage.get('userToken');

    let response = await fetch(APISetting.API_ENDPOINT + 'page/home', {
      method: 'GET',
      headers: {
        authorization: userToken,
      },
    });

    let post;
    if (response.status === 200) {
      post = await response.json();
    } else {
      console.log(response);
    }

    if (post.success === true) {
      this.feedsService.addFeeds(post.data);
      this.loadedFeeds = this.feedsService.getFeeds();
      if (this.loadedFeeds.length === 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
      event.target.complete();
    } else {
      let alert = await this.alertCtrl.create({
        message: post.message,
        buttons: [
          {
            text: 'OK',
            handler: () => {},
          },
        ],
      });
      await alert.present();
      event.target.complete();
      return;
    }
  }
}
