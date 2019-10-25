import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:project/src/app/feeds/feeds-detail/feeds-detail.page.spec.ts
import { FeedsDetailPage } from './feeds-detail.page';

describe('FeedsDetailPage', () => {
  let component: FeedsDetailPage;
  let fixture: ComponentFixture<FeedsDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedsDetailPage ],
=======
import { FeedsAddPostPage } from './feeds-add-post.page';

describe('FeedsAddPostPage', () => {
  let component: FeedsAddPostPage;
  let fixture: ComponentFixture<FeedsAddPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedsAddPostPage ],
>>>>>>> Add add item scene:project/src/app/feeds-add-post/feeds-add-post.page.spec.ts
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD:project/src/app/feeds/feeds-detail/feeds-detail.page.spec.ts
    fixture = TestBed.createComponent(FeedsDetailPage);
=======
    fixture = TestBed.createComponent(FeedsAddPostPage);
>>>>>>> Add add item scene:project/src/app/feeds-add-post/feeds-add-post.page.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
