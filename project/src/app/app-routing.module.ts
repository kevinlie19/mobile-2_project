import {AuthGuard} from './auth/auth.guard';
import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'feeds', pathMatch: 'full'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthPageModule'},
  {
    path: 'set-up-profile',
    canLoad: [AuthGuard],
    loadChildren:
      './set-up-profile/set-up-profile.module#SetUpProfilePageModule',
  },
  {
    path: 'profile',
    canLoad: [AuthGuard],
    loadChildren: './profile/profile.module#ProfilePageModule',
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
    path: 'request',
    canLoad: [AuthGuard],
    loadChildren: './request/request.module#RequestPageModule'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
