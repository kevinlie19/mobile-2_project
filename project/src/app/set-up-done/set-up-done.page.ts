import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-set-up-done',
  templateUrl: './set-up-done.page.html',
  styleUrls: ['./set-up-done.page.scss'],
})
export class SetUpDonePage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onClickOk() {
    this.router.navigateByUrl('/feeds');
  }
}
