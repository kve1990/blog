import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';

import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.scss']
})
export class PostDeleteComponent implements OnInit, OnDestroy {
  post: Post;
  subscription: Subscription;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;

    this.subscription = this.postService
      .getPost(id)
      .subscribe(post => {
        this.post = post;
      });
  }

  delete(post) {
    this.postService.deletePost(post).subscribe(res => {
      console.log('res', res);
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
