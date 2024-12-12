import { Component, ElementRef, EventEmitter, Input, Output, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss',
})
export class ChatroomComponent {
  @Input() room: any;
  @Output() close = new EventEmitter<void>();
  @ViewChild("messageList", { static: false }) messageList!: ElementRef;
  // Host elements from components requries the type of component itself
  user = signal(null);
  chat = new FormControl("");
  messages = signal([]);
  //otherTyping = signal(false);

  constructor(
    private messageService: MessageService,
    private userService: UserService,
  ) { }
  ngOnInit() {
    this.messages.set(this.room.messages);
    this.scrollMessages();
    this.messageService.getChatroom().subscribe((message: any) => {
      //if (message?.typing == true) {
      //  this.otherTyping.set(true)
      //}
      this.messages.set(this.messages().concat([message]));
      this.scrollMessages();
    })
    this.userService.getLoggedUser().subscribe((user: any) => {
      this.user.set(user);
    })
  }
  scrollMessages() {
    setTimeout(() => {
      const container = this.messageList.nativeElement as HTMLElement;
      container.scrollTop = container.scrollHeight;
    }, 100);
  }
  sendMessage() {
    //alert(this.user()?.lastname + " is sending message: " + this.chat.value);
    this.messageService.sendMessage({
      user_id: this.user()?.id,
      room_id: this.room.id,
      content: this.chat.value });
  }
  onClose() {
    this.close.emit();
  }

}
