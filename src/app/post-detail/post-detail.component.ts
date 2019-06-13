import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post: Post;
  subscription: Subscription;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;

    this.subscription = this.postService
      .getPost(id)
      .subscribe(post => {
        this.post = post;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
