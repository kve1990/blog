import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent  implements OnInit, OnDestroy {
  posts: Post[] = [];
  subscription: Subscription;

  constructor(
    private postService: PostService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.subscription = forkJoin([
      this.postService.getPosts()
    ]).subscribe(results => {
      this.posts = (results[0] as Post[]);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
