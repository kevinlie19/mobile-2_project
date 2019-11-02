import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {BarcodeScannerOptions, BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { Storage } from '@ionic/storage';

import {Feeds} from './feeds.model';
import {FeedsService} from './feeds.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.page.html',
  styleUrls: ['./feeds.page.scss'],
})
export class FeedsPage implements OnInit {
  loadedFeeds: Feeds[];
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  loginStatus: Boolean = false;

  constructor(
    private feedsService: FeedsService,
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    private appService: AppService) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  ngOnInit() {
    this.loadedFeeds = this.feedsService.allFeeds;
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

  scanBarcode() {
    this.barcodeScanner
    .scan()
    .then(barcodeData => {
      this.scannedData = barcodeData;

      if (barcodeData.text === '8996001600269'){
        alert('Barcode number ' + JSON.stringify(barcodeData.text) + '\nYou scanned a Sari Roti!');
        this.appService.setScanBarcodeFeeds({
          id: 'f1',
          item_name: 'Sari Roti',
          status: 'Available',
          category: 'Bread',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          buyDate: '11/17/2019',
          expDate: '11/31/2019',
          timestamps: '1',
          // tslint:disable-next-line: max-line-length
          itemImageUrl: 'https://www.rotinyaindonesia.com/contents/sari-roti-p40cyI20181009132656.png',
          username: 'Cecilia K.',
          location: 'Jakarta Selatan',
          avatar: 'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg'
        });
      } else {
        alert('Barcode number ' + JSON.stringify(barcodeData.text) + '\nYou scanned a Bear Brand!');
        this.appService.setScanBarcodeFeeds({
          id: 'f2',
          item_name: 'Susu Bear Brand',
          status: 'Available',
          category: 'Milk',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          buyDate: '11/17/2019',
          expDate: '11/31/2019',
          timestamps: '1',
          // tslint:disable-next-line: max-line-length
          itemImageUrl: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2017/10/24/803115/803115_1bff2b5d-59af-4506-bcba-f027e09275cc_1250_1664.jpg',
          username: 'Cecilia K.',
          location: 'Jakarta Selatan',
          avatar: 'https://www.venmond.com/demo/vendroid/img/avatar/big.jpg'
        });
      }

      this.router.navigateByUrl('/feeds-add-post');
    })
    .catch(err => {
      console.log('Error', err);
    });
  }
}
