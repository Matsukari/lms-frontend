import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(
    private http: HttpClient,
  ) { }
  message(data: { sender: string, receiver: string, message: string }) {

  }
}
