import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { PostDeleteComponent } from './post-delete/post-delete.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/blog'
  },
  {
    path: 'blog',
    pathMatch: 'full',
    component: PostListComponent
  },
  {
    path: 'blog/:id',
    component: PostDetailComponent
  },
  {
    path: 'blog/update/:id',
    component: PostUpdateComponent
  },
  {
    path: 'blog/delete/:id',
    component: PostDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
