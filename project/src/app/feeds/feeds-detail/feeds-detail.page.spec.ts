import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedsDetailPage } from './feeds-detail.page';

describe('FeedsDetailPage', () => {
  let component: FeedsDetailPage;
  let fixture: ComponentFixture<FeedsDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedsDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
