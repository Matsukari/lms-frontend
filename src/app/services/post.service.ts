import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(
    private http: HttpClient,
  ) { }
  ngOnInit() {
  }
  getCommunity() {
    return this.http.get(environment.apiUrl + "/get/community/");
  }
  getPost(id: string, reacts?: boolean, comments?: boolean) {
    const params = new HttpParams()
      .set("reacts", reacts)
      .set("comments", comments);
    return this.http.get(environment.apiUrl + "/get/post/" + id, { params: params });
  }
  setMeta(id: string, data: {key: string, value: any}) {
    return this.http.post(environment.apiUrl + "/set/meta/" + id, data);
  }
  getPostsFromGroup(id: string, reacts?: boolean, comments?: boolean) {
    return this.http.get(environment.apiUrl + "/get/posts/group/" + id);
  }
  getResourcesFromGroup(id: string, reacts?: boolean, comments?: boolean) {
    return this.http.get(environment.apiUrl + "/get/resources/group/" + id);
  }
  comment(data: { text: string, post: number, user: number }) {
    return this.http.post(environment.apiUrl + "/post/comment", data);
  }
  deleteComment(id: string) {
    return this.http.delete(environment.apiUrl + "/delete/comment/" + id);
  }
  react(data: { post: number, user: number, reaction: string }) {
    return this.http.post(environment.apiUrl + "/post/react", data);
  }
  favorite(data: { post: number, user: number }) {
    return this.http.post(environment.apiUrl + "/post/favorite", data);
  }
  hasReacted(post: number, user: number) {
    return this.http.post(environment.apiUrl + "/post/has/reaction", { user: user, post: post, reaction: "" });
  }
  isFavorited(post: number, user: number) {
    return this.http.post(environment.apiUrl + "/post/is/favorited", { user: user, post: post, reaction: "" });
  }
  post(data: {
    title: string,
    desc: string,
    source: number,
    group: number
    cover: string,
    attachments: string[]
  }) {
    //alert(data.title + data.desc + data.source);
    return this.http.post(environment.apiUrl + "/create/post", data);
  }
}
