import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  constructor(private router: Router, private storage: Storage) {}

  ngOnInit() {
    setTimeout(() => {
      this.storage.get('userToken').then((token) => {
        if (token !== null) {
          this.router.navigateByUrl('/feeds');
        } else {
          this.router.navigateByUrl('/welcome');
        }
      });
    }, 2000);
  }
}
