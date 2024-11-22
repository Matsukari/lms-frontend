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
  getTaskSubmission(task: string, userId: string) {
    return this.http.get(`${environment.apiUrl}/from/task-submission/${task}/${userId}`);
  }
  getTaskOtherSubmissions(task: string, userId: string) {
    return this.http.get(`${environment.apiUrl}/from/task-other-submission/${task}/${userId}`);
  }
  getTask(id: string, submissions?: boolean, assigned_users?: boolean, assigned_groups?: boolean) {
    const params = new HttpParams()
    .set("submissions", submissions)
    .set("assigned_users", assigned_users)
    .set("assigned_groups", assigned_groups);
    return this.http.get(environment.apiUrl + "/get/task/" + id, {params: params});
  }
  getTasksFromGroup(id: string, submissions?: boolean, assigned_users?: boolean, assigned_groups?: boolean) {
    const params = new HttpParams()
    .set("submissions", submissions)
    .set("assigned_users", assigned_users)
    .set("assigned_groups", assigned_groups);
    return this.http.get(environment.apiUrl + "/get/tasks/group/" + id, {params: params});
  }
  comment(data: { text: string, post: number, user: number }) {
    return this.http.post(environment.apiUrl + "/task/comment", data);
  }
  submit(data: {attachments: any, remark: string, user: any, source: any}) {
    return this.http.post(environment.apiUrl + "/post/submission", data);
  }
  grade(data: {attachments: any, remark: string, grade: number, user: any, source: any}) {
    return this.http.post(environment.apiUrl + "/task/grade", data);
  }
}
