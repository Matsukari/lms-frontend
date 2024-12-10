import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private socket$: WebSocketSubject<{}>;
  private sock: WebSocket;

  constructor(
    private http: HttpClient,
  ) {
    this.socket$ = new WebSocketSubject("ws://" + environment.raw + "/chatroom");
    //this.sock = new WebSocket("ws://" + environment.raw + "/chatroom");
  }
  sendMessage(data: { user_id: number, content: string, room_id: number, receiver_id?: number }) {
    this.socket$.next(data);
  }
  updateTyping() {
    this.socket$.next({"_typing": true});
  }
  getChatroom() {
    return this.socket$;
  }
}
