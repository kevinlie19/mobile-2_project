import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenNotificationPage } from './token-notification.page';

describe('TokenNotificationPage', () => {
  let component: TokenNotificationPage;
  let fixture: ComponentFixture<TokenNotificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenNotificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
