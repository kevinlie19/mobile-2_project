import {AuthGuard} from './auth/auth.guard';
import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'splash', pathMatch: 'full'},
  {path: 'splash', loadChildren: './splash/splash.module#SplashPageModule'},
  {path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthPageModule'},
  {
    path: 'set-up-profile',
    canLoad: [AuthGuard],
    loadChildren:
      './set-up-profile/set-up-profile.module#SetUpProfilePageModule',
  },
  {
    path: 'set-up-done',
    loadChildren: './set-up-done/set-up-done.module#SetUpDonePageModule',
  },
  {
    path: 'feeds',
    children: [
      {
        path: '',
        canLoad: [AuthGuard],
        loadChildren: './feeds/feeds.module#FeedsPageModule',
      },
      {
        path: ':feedsId',
        canLoad: [AuthGuard],
        loadChildren:
          './feeds/feeds-detail/feeds-detail.module#FeedsDetailPageModule',
      },
    ],
  },
  {
    path: 'feeds-add-post',
    canLoad: [AuthGuard],
    loadChildren:
      './feeds-add-post/feeds-add-post.module#FeedsAddPostPageModule',
  },
  {
    path: 'feeds-edit-post',
    canLoad: [AuthGuard],
    loadChildren:
      './feeds/feeds-detail/feeds-edit-post/feeds-edit-post.module#FeedsEditPostPageModule',
  },
  {
    path: 'request',
    canLoad: [AuthGuard],
    loadChildren: './request/request.module#RequestPageModule',
  },
  {
    path: 'profile',
    canLoad: [AuthGuard],
    loadChildren: './profile/profile.module#ProfilePageModule',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
