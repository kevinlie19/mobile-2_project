import {AuthGuard} from './auth/auth.guard';
import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadChildren: './splash/splash.module#SplashPageModule',
  },
  {
    path: 'welcome',
    loadChildren: './welcome/welcome.module#WelcomePageModule',
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthPageModule',
  },
  {
    path: 'set-up-profile',
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
    path: ':fromPage/feeds-detail/:feedsId',
    loadChildren: './feeds-detail/feeds-detail.module#FeedsDetailPageModule',
  },
  {
    path: 'feeds-add-post',
    loadChildren:
      './feeds-add-post/feeds-add-post.module#FeedsAddPostPageModule',
  },
  {
    path: 'feeds-edit-post',
    loadChildren:
      './feeds-detail/feeds-edit-post/feeds-edit-post.module#FeedsEditPostPageModule',
  },
  {
    path: 'request',
    loadChildren: './request/request.module#RequestPageModule',
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfilePageModule',
  },
  {
    path: 'profile-user/:userId',
    loadChildren: './profile-user/profile-user.module#ProfileUserPageModule',
  },
  {
    path: 'profile-edit',
    loadChildren:
      './profile/profile-edit/profile-edit.module#ProfileEditPageModule',
  },
  {
    path: 'search',
    loadChildren: './search/search.module#SearchPageModule',
  },
  {
    path: 'chat-list',
    loadChildren: './chat-list/chat-list.module#ChatListPageModule',
  },
  {
    path: 'chat/:chatId',
    loadChildren: './chat-list/chat/chat.module#ChatPageModule',
  },
  {
    path: 'add-item',
    loadChildren: './add-item/add-item.module#AddItemPageModule',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
