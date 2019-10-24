import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUpProfilePage } from './set-up-profile.page';

describe('SetUpProfilePage', () => {
  let component: SetUpProfilePage;
  let fixture: ComponentFixture<SetUpProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetUpProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetUpProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
