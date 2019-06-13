import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../models/post.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PostService {
  posts: Post[];

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get('http://localhost:5000').pipe(
      map(res => this.posts = (res as Post[]))
    );
  }

  getPost(id: number): Observable<Post> {
    return this.getPosts().pipe(
      map(posts => posts.filter(post => post.id === id)[0])
    );
  }

  updatePost(post: Post) {
    return this.http.put(`http://localhost:5000/update/${post.id}`, post);
  }

  createPost(post: Post) {
    return this.http.put(`http://localhost:5000/create`, post);
  }

  deletePost(post: Post) {
    console.log('delete');
    return this.http.delete(`http://localhost:5000/delete/${post.id}`);
  }
}
