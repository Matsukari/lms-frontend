import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private http: HttpClient,
  ) { }
  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(environment.apiUrl + "/upload/new", formData);
  }
  replaceFile(id: string, file: File) {
    return this.http.post(environment.apiUrl + "/upload/replace/" + id, file);
  }
  removeFile(id: string) {
    return this.http.delete(environment.apiUrl + "/upload/remove/" + id);
  }
}
