import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(
    private http: HttpClient,
  ) { }
  ngOnInit() {
  }
  getGroup(id: string, members?: boolean, tasks?: boolean, posts?: boolean) {
    const params = new HttpParams()
    .set("members", members)
    .set("tasks", tasks)
    .set("posts", posts);
    return this.http.get(environment.apiUrl + "/get/group/" + id, {params: params});
  }
  getGroups(type: string) {
    return this.http.get(environment.apiUrl + "/get/groups/" + type);
  }
}
