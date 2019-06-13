import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';

import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.scss']
})
export class PostUpdateComponent implements OnInit, OnDestroy {
  post: Post;
  subscription: Subscription;
  isNew: boolean;
  textButton: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;

    if (id) {
      this.textButton = 'Редактировать';
      this.subscription = this.postService
        .getPost(id)
        .subscribe(post => {
          this.post = post;
        });
    } else {
      this.textButton = 'Cоздать';
      this.isNew = true;
      const postId = this.genId(this.postService.posts);
      this.post = new Post(postId);
    }
  }

  edit(post: Post) {
    if (this.isNew) {
      this.postService.createPost(post).subscribe(res => {
        console.log('res', res);
        this.router.navigate(['/']);
      });
    } else {
      this.postService.updatePost(post).subscribe(res => {
        console.log('res', res);
        this.router.navigate(['/']);
      });
    }
  }

  genId(posts: Post[]): number {
    return posts.length > 0 ? Math.max(...posts.map(post => +post.id)) + 1 : 11;
  }

  ngOnDestroy() {
    if (!this.isNew) {
      this.subscription.unsubscribe();
    }
  }

}
