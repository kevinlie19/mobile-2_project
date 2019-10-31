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
    loadChildren: './feeds/feeds.module#FeedsPageModule',
  },
  {
    path: 'feeds-detail/:feedsId',
    canLoad: [AuthGuard],
    loadChildren: './feeds-detail/feeds-detail.module#FeedsDetailPageModule',
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
      './feeds-detail/feeds-edit-post/feeds-edit-post.module#FeedsEditPostPageModule',
  },
  {
    path: 'request',
    canLoad: [AuthGuard],
    loadChildren: './request/request.module#RequestPageModule',
  },
  {
    path: 'profile',
    // canLoad: [AuthGuard],
    loadChildren: './profile/profile.module#ProfilePageModule',
  },
  {
    path: 'profile-user',
    canLoad: [AuthGuard],
    loadChildren: './profile-user/profile-user.module#ProfileUserPageModule',
  },
  {
    path: 'profile-edit',
    canLoad: [AuthGuard],
    loadChildren:
      './profile/profile-edit/profile-edit.module#ProfileEditPageModule',
  },
  {
    path: 'search',
    canLoad: [AuthGuard],
    loadChildren: './search/search.module#SearchPageModule',
  },

  // { path: 'chat-list', loadChildren: './chat-list/chat-list.module#ChatListPageModule' },
  // { path: 'chat', loadChildren: './chat-list/chat/chat.module#ChatPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
