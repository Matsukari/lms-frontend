import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private http: HttpClient,
  ) { }
  ngOnInit() {
  }
  getTaskSubmisison(task: string, userId: string) {
    return this.http.get(`${environment.apiUrl}/from/task-submission/${task}/${userId}`);
  }
  getTask(id: string, submissions?: boolean, assigned_users?: boolean, assigned_groups?: boolean) {
    const params = new HttpParams()
    .set("submissions", submissions)
    .set("assigned_users", assigned_users)
    .set("assigned_groups", assigned_groups);
    return this.http.get(environment.apiUrl + "/get/task/" + id, {params: params});
  }
  comment(text: string) {
    return this.http.post(environment.apiUrl + "/post/comment", text);
  }
}
